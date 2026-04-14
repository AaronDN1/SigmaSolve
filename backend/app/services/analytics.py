import json
from datetime import datetime, timezone
from threading import Thread
from typing import Any
from urllib import error, request

from fastapi import Request

from app.core.config import settings
from app.services.auth import decode_session_token


def analytics_enabled() -> bool:
    return settings.analytics_enabled and bool(settings.posthog_project_api_key)


def get_request_user_id(request: Request) -> str | None:
    session_token = request.cookies.get(settings.session_cookie_name)
    if not session_token:
        return None

    try:
        payload = decode_session_token(session_token)
    except Exception:
        return None

    return str(payload.get("sub")) if payload.get("sub") else None


def get_request_session_id(request: Request) -> str | None:
    return request.headers.get("x-sigma-session-id")


def get_request_feature_name(request: Request) -> str | None:
    return request.headers.get("x-sigma-feature-name")


def _send_to_posthog(event: str, distinct_id: str, properties: dict[str, Any], timestamp: datetime | None = None) -> None:
    if not analytics_enabled():
        return

    payload = {
        "api_key": settings.posthog_project_api_key,
        "event": event,
        "distinct_id": distinct_id,
        "properties": properties,
        "timestamp": (timestamp or datetime.now(timezone.utc)).isoformat(),
    }

    encoded = json.dumps(payload).encode("utf-8")
    http_request = request.Request(
        url=f"{settings.posthog_host.rstrip('/')}/capture/",
        data=encoded,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(http_request, timeout=2):
            return
    except (error.URLError, TimeoutError, ValueError):
        return


def capture_analytics_event(
    event: str,
    *,
    distinct_id: str | None,
    properties: dict[str, Any] | None = None,
    timestamp: datetime | None = None,
) -> None:
    if not analytics_enabled():
        return

    safe_distinct_id = distinct_id or "anonymous"
    safe_properties = {"source": "sigma_solve", **(properties or {})}

    Thread(
        target=_send_to_posthog,
        args=(event, safe_distinct_id, safe_properties, timestamp),
        daemon=True,
    ).start()
