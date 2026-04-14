from fastapi import APIRouter, Request, Response

from app.schemas.analytics import AnalyticsCaptureRequest
from app.services.analytics import capture_analytics_event, get_request_user_id


router = APIRouter()


@router.post("/capture", status_code=204)
def capture(payload: AnalyticsCaptureRequest, request: Request) -> Response:
    user_id = get_request_user_id(request)
    properties = {
        **payload.properties,
        "user_id": payload.properties.get("user_id") or user_id,
    }
    capture_analytics_event(
        payload.event,
        distinct_id=payload.distinct_id or user_id or payload.properties.get("anonymous_id"),
        properties=properties,
        timestamp=payload.timestamp,
    )
    return Response(status_code=204)
