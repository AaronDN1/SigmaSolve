from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.generated_output import GeneratedOutput
from app.models.uploaded_file import UploadPurpose, UploadedFile
from app.schemas.workspace import DashboardResponse, LabHelperRequest, PromptRequest, PromptResponse
from app.services.files import save_upload, upload_to_response
from app.services.openai_service import generate_lab_report, generate_prompt_response
from app.services.usage import ensure_usage_available, record_usage


router = APIRouter()


@router.get("/dashboard", response_model=DashboardResponse)
def dashboard(user=Depends(get_current_user), db: Session = Depends(get_db)):
    recent_outputs = (
        db.query(GeneratedOutput)
        .filter(GeneratedOutput.user_id == user.id)
        .order_by(GeneratedOutput.created_at.desc())
        .limit(6)
        .all()
    )
    uploads = (
        db.query(UploadedFile)
        .filter(UploadedFile.user_id == user.id)
        .order_by(UploadedFile.created_at.desc())
        .limit(8)
        .all()
    )
    return {
        "recent_outputs": [
            {
                "id": output.id,
                "title": output.title,
                "output_type": output.output_type.value,
                "created_at": output.created_at,
            }
            for output in recent_outputs
        ],
        "uploaded_files": [upload_to_response(upload) for upload in uploads],
    }


@router.post("/upload")
def upload_file(
    purpose: UploadPurpose = Form(...),
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    upload = save_upload(db, user, file, purpose)
    return upload_to_response(upload)


@router.post("/prompt", response_model=PromptResponse)
def prompt_tool(payload: PromptRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    ensure_usage_available(db, user)
    uploads = db.query(UploadedFile).filter(UploadedFile.user_id == user.id, UploadedFile.id.in_(payload.file_ids)).all()
    try:
        content = generate_prompt_response(db, user, payload, uploads)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"OpenAI prompt failed: {exc}") from exc
    usage_remaining = record_usage(db, user, "ai_prompt")
    return {"content": content, "usage_remaining": usage_remaining}


@router.post("/lab-helper", response_model=PromptResponse)
def lab_helper_tool(payload: LabHelperRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    ensure_usage_available(db, user)
    uploads = db.query(UploadedFile).filter(UploadedFile.user_id == user.id, UploadedFile.id.in_(payload.file_ids)).all()
    content = generate_lab_report(db, user, payload, uploads)
    usage_remaining = record_usage(db, user, "lab_helper")
    return {"content": content, "usage_remaining": usage_remaining}
