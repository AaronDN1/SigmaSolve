# Sigma Solve

Sigma Solve is a full-stack STEM learning platform with AI tutoring, lab drafting and Python-powered graph generation.

## Architecture

- `frontend/`: Next.js 15, React, TypeScript, Tailwind CSS, KaTeX rendering
- `backend/`: FastAPI, SQLAlchemy, PostgreSQL, OpenAI Responses API, Stripe, matplotlib
- `storage/`: local uploaded files and generated graphs for development

This split keeps the UI fast and product-focused while leaving Python responsible for AI orchestration, graph generation, uploads, and business rules.

## Project structure

```text
SigmaSolve/
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
    storage/
  frontend/
    app/
    components/
    lib/
    types/
  docker-compose.yml
  .env.example
```

## Backend responsibilities

- Google credential verification and session cookie issuance
- PostgreSQL-backed user, subscription, usage, upload, and output records
- Stripe checkout and webhook subscription syncing
- OpenAI prompt orchestration with a strong default STEM tutor system prompt
- PDF/image upload handling for AI Prompt and Lab Helper
- Python graph generation with matplotlib
- Free-tier enforcement at 3 total generations per day

## Frontend responsibilities

- Premium marketing homepage with hero, features, workflow, pricing, and CTA sections
- Sign-in page with Google Identity Services
- Logged-in workspace with AI Prompt, Lab Helper, and Graphing tabs
- KaTeX-backed readable math rendering
- Upgrade flow entry point for Stripe checkout

## Local setup

1. Start PostgreSQL:

```bash
docker compose up -d postgres
```

2. Copy `.env.example` to `.env`, then mirror the relevant values into `backend/.env` and `frontend/.env.local`.

3. Start the backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

4. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and expects the FastAPI API at `http://localhost:8000`.

## Environment variables

### Frontend

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `NEXT_PUBLIC_STRIPE_PRICE_ID`

### Backend

- `DATABASE_URL`
- `SECRET_KEY`
- `BACKEND_CORS_ORIGINS`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `SESSION_COOKIE_NAME`

## Notes

- Usage limits count successful AI Prompt, Lab Helper, and Graphing generations.
- File storage is local-first in `backend/storage/` and can be swapped for cloud storage later.
- Mathematical markdown is rendered with KaTeX in the frontend.
- Tables are auto-created on backend startup for local development.
- In production, session cookie `secure` handling should be enabled behind HTTPS.
