from pydantic import BaseModel


class CheckoutSessionRequest(BaseModel):
    success_path: str = "/app?billing=success"
    cancel_path: str = "/app?billing=cancelled"


class CheckoutSessionResponse(BaseModel):
    checkout_url: str
