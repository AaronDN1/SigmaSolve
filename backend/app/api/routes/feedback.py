from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_optional_user
from app.db.session import get_db
from app.models.feedback import FeedbackSubmission
from app.schemas.feedback import FeedbackCreateRequest, FeedbackCreateResponse


router = APIRouter()


@router.post("", response_model=FeedbackCreateResponse)
def create_feedback(
    payload: FeedbackCreateRequest,
    user=Depends(get_optional_user),
    db: Session = Depends(get_db),
):
    subject = payload.subject.strip()
    body = payload.body.strip()
    if not subject or not body:
        raise HTTPException(status_code=422, detail="Subject and feedback body are required.")

    feedback = FeedbackSubmission(
        user_id=user.id if user else None,
        submitter_email=user.email if user else None,
        subject=subject,
        body=body,
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback
