from datetime import date

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.usage import DailyUsage
from app.models.user import PlanType, User


FEATURE_FIELD_MAP = {
    "ai_prompt": "ai_prompt_uses",
    "lab_helper": "lab_helper_uses",
    "graphing": "graphing_uses",
}


def get_or_create_daily_usage(db: Session, user: User) -> DailyUsage:
    usage = db.query(DailyUsage).filter(DailyUsage.user_id == user.id, DailyUsage.usage_date == date.today()).first()
    if usage:
        return usage

    usage = DailyUsage(user_id=user.id, usage_date=date.today())
    db.add(usage)
    db.commit()
    db.refresh(usage)
    return usage


def ensure_usage_available(db: Session, user: User) -> DailyUsage:
    usage = get_or_create_daily_usage(db, user)
    if user.plan_type == PlanType.UNLIMITED:
        return usage
    if usage.total_uses >= settings.free_daily_limit:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Free plan daily limit reached. Upgrade to Sigma Solve Unlimited for uninterrupted access.",
        )
    return usage


def record_usage(db: Session, user: User, feature: str) -> int | None:
    usage = ensure_usage_available(db, user)
    field_name = FEATURE_FIELD_MAP[feature]
    setattr(usage, field_name, getattr(usage, field_name) + 1)
    usage.total_uses += 1
    db.commit()
    db.refresh(usage)

    if user.plan_type == PlanType.UNLIMITED:
        return None
    return max(settings.free_daily_limit - usage.total_uses, 0)
