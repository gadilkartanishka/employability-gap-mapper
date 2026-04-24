from fastapi import APIRouter
from app.api.endpoints import auth, uploads, jobs, analysis

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(uploads.router, prefix="/uploads", tags=["uploads"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
