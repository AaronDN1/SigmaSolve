from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.core.config import settings
from app.db.session import create_db_and_tables


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.mount("/storage", StaticFiles(directory=settings.storage_root), name="storage")


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
