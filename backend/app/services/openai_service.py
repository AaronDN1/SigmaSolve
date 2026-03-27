from openai import OpenAI
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.generated_output import GeneratedOutput, OutputType
from app.models.uploaded_file import UploadedFile
from app.models.user import User
from app.schemas.workspace import LabHelperRequest, PromptRequest
from app.services.files import extract_file_context


client = OpenAI(api_key=settings.openai_api_key)

DEFAULT_SYSTEM_PROMPT = """
You are Sigma Solve, a patient STEM professor and tutor.
Teach clearly and rigorously.
Prefer logical step-by-step explanations when that helps learning.
Keep the response polished, concise where appropriate, and student-friendly.
Use readable math formatting and avoid dumping raw unreadable LaTeX syntax into the final answer.
If giving equations, present them cleanly and explain what each symbol means when useful.
Prioritize teaching, clarity, and academic honesty over shortcut answers.
""".strip()


def _build_file_input(upload: UploadedFile) -> dict[str, str | dict]:
    context = extract_file_context(upload)
    if context["type"] == "image":
        return {"type": "image_url", "image_url": {"url": context["data_url"]}}
    return {"type": "text", "text": f"File context from {upload.original_name}:\n{context['text']}"}


def _create_chat_completion(prompt_text: str, uploads: list[UploadedFile]) -> str:
    text_sections = [prompt_text]
    image_parts = []

    for upload in uploads:
        file_input = _build_file_input(upload)
        if file_input["type"] == "image_url":
            image_parts.append(file_input)
        else:
            text_sections.append(file_input["text"])

    full_text_prompt = "\n\n".join(text_sections)

    try:
        if image_parts:
            response = client.chat.completions.create(
                model=settings.openai_model,
                messages=[
                    {"role": "system", "content": DEFAULT_SYSTEM_PROMPT},
                    {"role": "user", "content": [{"type": "text", "text": full_text_prompt}, *image_parts]},
                ],
            )
        else:
            response = client.chat.completions.create(
                model=settings.openai_model,
                messages=[
                    {"role": "system", "content": DEFAULT_SYSTEM_PROMPT},
                    {"role": "user", "content": full_text_prompt},
                ],
            )
    except Exception:
        fallback_prompt = full_text_prompt
        if image_parts:
            fallback_prompt = f"{full_text_prompt}\n\nOne or more image uploads were provided as context."
        response = client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": DEFAULT_SYSTEM_PROMPT},
                {"role": "user", "content": fallback_prompt},
            ],
        )

    text = response.choices[0].message.content or ""
    return text.strip()


def generate_prompt_response(db: Session, user: User, request: PromptRequest, uploads: list[UploadedFile]) -> str:
    prompt_text = f"Subject: {request.subject}\n\n{request.prompt}"
    text = _create_chat_completion(prompt_text, uploads)
    db.add(GeneratedOutput(user_id=user.id, output_type=OutputType.AI_PROMPT, title=request.subject, content=text))
    db.commit()
    return text


def generate_lab_report(db: Session, user: User, request: LabHelperRequest, uploads: list[UploadedFile]) -> str:
    prompt = f"""
Create a strong, professor-ready lab report draft for the following STEM lab.

Subject: {request.subject}
Lab title: {request.lab_title}
Description: {request.description}
Observations: {request.observations}
Methods: {request.methods}
Results: {request.results}
Additional notes: {request.notes}

Use this structure:
1. Title
2. Abstract
3. Objective / Purpose
4. Materials / Methods
5. Data / Results
6. Analysis / Discussion
7. Sources of Error
8. Conclusion

Be formal, specific, and make use of the supplied details and file context.
""".strip()

    text = _create_chat_completion(prompt, uploads)
    db.add(
        GeneratedOutput(
            user_id=user.id,
            output_type=OutputType.LAB_HELPER,
            title=request.lab_title,
            content=text,
        )
    )
    db.commit()
    return text
