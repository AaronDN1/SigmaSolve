from pydantic import BaseModel


class UsageStatusResponse(BaseModel):
    plan_type: str
    total_used_today: int
    daily_limit: int | None
    remaining_today: int | None
