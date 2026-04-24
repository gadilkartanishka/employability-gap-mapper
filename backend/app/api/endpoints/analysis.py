from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.db.session import get_session
from app.models.college import College, GapResult, GapResultRead, SyllabusUpload
from app.services.analysis import analysis_service

router = APIRouter()

def format_gap_result(result: GapResult) -> GapResultRead:
    return GapResultRead(
        id=result.id,
        upload_id=result.upload_id,
        target_role=result.target_role,
        gap_score=result.gap_score,
        covered_skills=result.covered_skills.split(",") if result.covered_skills else [],
        missing_skills=result.missing_skills.split(",") if result.missing_skills else [],
        excess_skills=result.excess_skills.split(",") if result.excess_skills else [],
        generated_at=result.generated_at
    )

@router.post("/compute/{upload_id}", response_model=GapResultRead)
def compute_analysis(
    upload_id: int,
    target_role: str = "Software Developer",
    current_college: College = Depends(deps.get_current_college),
) -> Any:
    """
    Trigger a gap analysis for a specific upload.
    """
    try:
        result = analysis_service.compute_gap(upload_id, target_role)
        return format_gap_result(result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/results/{upload_id}", response_model=List[GapResultRead])
def get_analysis_results(
    upload_id: int,
    current_college: College = Depends(deps.get_current_college),
    session: Session = Depends(get_session),
) -> Any:
    """
    Get all historical analysis results for a specific upload.
    """
    statement = select(GapResult).where(GapResult.upload_id == upload_id)
    results = session.exec(statement).all()
    return [format_gap_result(r) for r in results]

@router.get("/latest", response_model=GapResultRead)
def get_latest_analysis(
    current_college: College = Depends(deps.get_current_college),
    session: Session = Depends(get_session),
) -> Any:
    """
    Get the most recent gap analysis for the logged-in college.
    """
    statement = select(GapResult).where(GapResult.college_id == current_college.id).order_by(GapResult.generated_at.desc())
    result = session.exec(statement).first()
    if not result:
        raise HTTPException(status_code=404, detail="No analysis results found")
    return format_gap_result(result)
