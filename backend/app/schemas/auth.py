from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class GoogleSignInRequest(BaseModel):
    credential: str
    accepted_terms: bool = False
    accepted_privacy: bool = False


class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    avatar_url: str | None
    plan_type: str
    active_subscription: bool
    daily_usage_count: int
    daily_usage_limit: int | None
    created_at: datetime


class SessionResponse(BaseModel):
    user: UserResponse | None
