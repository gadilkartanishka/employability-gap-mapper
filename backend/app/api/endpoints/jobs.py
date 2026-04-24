from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.db.session import get_session
from app.models.college import JobSkill, JobSkillRead
from app.tasks.jobs import refresh_job_market_data_task

router = APIRouter()

@router.get("/trends", response_model=List[JobSkillRead])
def get_job_trends(
    role: str = None,
    session: Session = Depends(get_session)
) -> Any:
    """
    Get current job market trends (top skills).
    """
    statement = select(JobSkill)
    if role:
        statement = statement.where(JobSkill.role == role)
    
    statement = statement.order_by(JobSkill.frequency.desc()).limit(50)
    results = session.exec(statement).all()
    return results

@router.post("/refresh")
def trigger_market_refresh(
    limit: int = 10,
) -> Any:
    """
    Manually trigger a job market data refresh.
    """
    refresh_job_market_data_task.delay(limit_per_role=limit)
    return {"message": "Job market refresh task triggered"}

@router.post("/seed")
def seed_market_data(
    session: Session = Depends(get_session)
) -> Any:
    """
    Seed JobSkill table from existing processed files.
    """
    import json
    try:
        with open("data/processed/skills_from_jobs.json") as f:
            data = json.load(f)
            for role, skills in data.items():
                for skill_name, count in skills.items():
                    statement = select(JobSkill).where(JobSkill.role == role, JobSkill.skill == skill_name)
                    db_skill = session.exec(statement).first()
                    if not db_skill:
                        db_skill = JobSkill(role=role, skill=skill_name, frequency=count)
                        session.add(db_skill)
            session.commit()
            return {"message": "Database seeded from existing JSON"}
    except Exception as e:
        return {"error": str(e)}
