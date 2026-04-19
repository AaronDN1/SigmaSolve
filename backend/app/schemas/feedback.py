from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class FeedbackCreateRequest(BaseModel):
    subject: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=1, max_length=5000)


class FeedbackCreateResponse(BaseModel):
    id: UUID
    subject: str
    created_at: datetime


class FeedbackAdminSummary(BaseModel):
    id: UUID
    user_id: UUID | None
    submitter_email: str | None
    subject: str
    body: str
    created_at: datetime
