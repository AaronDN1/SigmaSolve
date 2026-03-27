from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.deps import build_user_response, get_current_user
from app.core.config import settings
from app.db.session import get_db
from app.schemas.auth import GoogleSignInRequest, SessionResponse
from app.services.auth import create_session_token, get_or_create_user_from_google, verify_google_credential


router = APIRouter()


@router.post("/google", response_model=SessionResponse)
def google_sign_in(payload: GoogleSignInRequest, response: Response, db: Session = Depends(get_db)):
    try:
        claims = verify_google_credential(payload.credential)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Google sign-in failed.") from exc

    user = get_or_create_user_from_google(db, claims)
    token = create_session_token(user)
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * 7,
    )
    return {"user": build_user_response(db, user)}


@router.get("/session", response_model=SessionResponse)
def get_session(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return {"user": build_user_response(db, user)}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(settings.session_cookie_name)
    return {"success": True}
