from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class AnalyticsCaptureRequest(BaseModel):
    event: str = Field(min_length=1, max_length=120)
    properties: dict[str, Any] = Field(default_factory=dict)
    distinct_id: str | None = None
    timestamp: datetime | None = None
