from datetime import datetime, timezone

import stripe
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.subscription import Subscription, SubscriptionStatus
from app.models.user import PlanType, User


stripe.api_key = settings.stripe_secret_key


def ensure_customer(db: Session, user: User) -> str:
    if user.stripe_customer_id:
        return user.stripe_customer_id
    customer = stripe.Customer.create(email=user.email, name=user.full_name)
    user.stripe_customer_id = customer["id"]
    db.commit()
    db.refresh(user)
    return user.stripe_customer_id


def create_checkout_session(user: User, success_url: str, cancel_url: str) -> str:
    session = stripe.checkout.Session.create(
        customer=user.stripe_customer_id,
        mode="subscription",
        line_items=[{"price": settings.stripe_price_id, "quantity": 1}],
        success_url=success_url,
        cancel_url=cancel_url,
        allow_promotion_codes=True,
    )
    return session["url"]


def sync_subscription_from_stripe(db: Session, stripe_subscription: dict) -> None:
    customer_id = stripe_subscription.get("customer")
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return

    subscription = db.query(Subscription).filter(Subscription.user_id == user.id).first()
    if not subscription:
        subscription = Subscription(user_id=user.id)
        db.add(subscription)

    status = stripe_subscription.get("status", "inactive")
    subscription.stripe_subscription_id = stripe_subscription.get("id")
    subscription.stripe_price_id = stripe_subscription["items"]["data"][0]["price"]["id"]
    subscription.status = (
        SubscriptionStatus(status)
        if status in SubscriptionStatus._value2member_map_
        else SubscriptionStatus.INACTIVE
    )

    period_end = stripe_subscription.get("current_period_end")
    subscription.current_period_end = (
        datetime.fromtimestamp(period_end, tz=timezone.utc) if period_end else None
    )

    user.plan_type = (
        PlanType.UNLIMITED
        if subscription.status in {SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING, SubscriptionStatus.PAST_DUE}
        else PlanType.FREE
    )
    db.commit()
