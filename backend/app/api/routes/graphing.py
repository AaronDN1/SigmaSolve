from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.schemas.workspace import GraphRequest, GraphResponse
from app.services.graphing import generate_graph
from app.services.usage import ensure_usage_available, record_usage


router = APIRouter()


@router.post("/generate", response_model=GraphResponse)
def generate_graph_route(payload: GraphRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    ensure_usage_available(db, user)
    image_url = generate_graph(db, user, payload)
    usage_remaining = record_usage(db, user, "graphing")
    return {
        "image_url": image_url,
        "download_url": image_url,
        "usage_remaining": usage_remaining,
    }
