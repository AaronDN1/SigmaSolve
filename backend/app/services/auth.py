from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from google.auth.transport import requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.oauth_identity import OAuthIdentity, ProviderName
from app.models.subscription import Subscription, SubscriptionStatus
from app.models.usage import DailyUsage
from app.models.user import PlanType, User


def verify_google_credential(credential: str) -> dict[str, Any]:
    return id_token.verify_oauth2_token(credential, requests.Request(), settings.google_client_id)


def get_or_create_user_from_google(
    db: Session,
    claims: dict[str, Any],
    *,
    accepted_terms: bool = False,
    accepted_privacy: bool = False,
) -> tuple[User, bool]:
    google_sub = claims["sub"]
    email = claims["email"]
    accepted_at = datetime.now(timezone.utc)

    identity = (
        db.query(OAuthIdentity)
        .filter(
            OAuthIdentity.provider == ProviderName.GOOGLE,
            OAuthIdentity.provider_user_id == google_sub,
        )
        .first()
    )
    if identity:
        user = identity.user
        user.full_name = claims.get("name", user.full_name)
        user.avatar_url = claims.get("picture", user.avatar_url)
        if accepted_terms and not user.accepted_terms_at:
            user.accepted_terms_at = accepted_at
        if accepted_privacy and not user.accepted_privacy_at:
            user.accepted_privacy_at = accepted_at
        db.commit()
        db.refresh(user)
        return user, False

    user = db.query(User).filter(User.email == email).first()
    if not user and not (accepted_terms and accepted_privacy):
        raise ValueError("Please review and accept the Terms of Service and Privacy Policy to create your account.")

    created = False
    if not user:
        user = User(
            email=email,
            full_name=claims.get("name", email.split("@")[0]),
            avatar_url=claims.get("picture"),
            plan_type=PlanType.FREE,
            accepted_terms_at=accepted_at,
            accepted_privacy_at=accepted_at,
        )
        db.add(user)
        db.flush()
        db.add(Subscription(user_id=user.id, status=SubscriptionStatus.INACTIVE))
        db.add(DailyUsage(user_id=user.id))
        created = True
    else:
        if accepted_terms and not user.accepted_terms_at:
            user.accepted_terms_at = accepted_at
        if accepted_privacy and not user.accepted_privacy_at:
            user.accepted_privacy_at = accepted_at

    identity = OAuthIdentity(user_id=user.id, provider=ProviderName.GOOGLE, provider_user_id=google_sub)
    db.add(identity)
    db.commit()
    db.refresh(user)
    return user, created


def create_session_token(user: User) -> str:
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def decode_session_token(token: str) -> dict[str, Any]:
    return jwt.decode(token, settings.secret_key, algorithms=["HS256"])
