from typing import List, Dict, Any, Set
from sqlmodel import Session, select
from app.db.session import engine
from app.models.college import SyllabusUpload, SyllabusSkill, JobSkill, GapResult
from datetime import datetime

class AnalysisService:
    def compute_gap(self, upload_id: int, target_role: str) -> GapResult:
        with Session(engine) as session:
            # 1. Fetch Syllabus Skills
            upload = session.get(SyllabusUpload, upload_id)
            if not upload:
                raise ValueError("Upload not found")
            
            syllabus_skills = set(s.skill for s in upload.skills)
            
            # 2. Fetch Job Skills for the role
            # We take the top 30 most frequent skills as the industry standard
            job_skills_statement = select(JobSkill).where(JobSkill.role == target_role).order_by(JobSkill.frequency.desc()).limit(30)
            job_skills_results = session.exec(job_skills_statement).all()
            job_skills_set = set(js.skill for js in job_skills_results)
            
            if not job_skills_set:
                # Fallback: if no skills for specific role, just use general "Software Developer"
                job_skills_statement = select(JobSkill).where(JobSkill.role == "Software Developer").order_by(JobSkill.frequency.desc()).limit(30)
                job_skills_results = session.exec(job_skills_statement).all()
                job_skills_set = set(js.skill for js in job_skills_results)

            # 3. Calculate Gaps
            covered = job_skills_set & syllabus_skills
            missing = job_skills_set - syllabus_skills
            excess  = syllabus_skills - job_skills_set
            
            total_market_skills = len(job_skills_set)
            gap_score = round(len(missing) / total_market_skills * 100, 1) if total_market_skills else 0
            
            # 4. Save Result
            db_result = GapResult(
                college_id=upload.college_id,
                upload_id=upload.id,
                target_role=target_role,
                gap_score=gap_score,
                covered_skills=",".join(sorted(covered)),
                missing_skills=",".join(sorted(missing)),
                excess_skills=",".join(sorted(excess))
            )
            session.add(db_result)
            session.commit()
            session.refresh(db_result)
            
            return db_result

analysis_service = AnalysisService()
