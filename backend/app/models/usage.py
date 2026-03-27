import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class DailyUsage(Base):
    __tablename__ = "daily_usage"
    __table_args__ = (UniqueConstraint("user_id", "usage_date", name="uq_user_usage_date"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    usage_date: Mapped[date] = mapped_column(Date, default=date.today, index=True)
    total_uses: Mapped[int] = mapped_column(Integer, default=0)
    ai_prompt_uses: Mapped[int] = mapped_column(Integer, default=0)
    lab_helper_uses: Mapped[int] = mapped_column(Integer, default=0)
    graphing_uses: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow
    )

    user = relationship("User", back_populates="daily_usage")
