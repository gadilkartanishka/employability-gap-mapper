from app.worker import celery_app
from app.db.session import engine
from app.models.college import SyllabusUpload, SyllabusSkill
from app.services.nlp import extract_pdf_skills
from sqlmodel import Session
import os

@celery_app.task(name="process_syllabus_task")
def process_syllabus_task(upload_id: int):
    with Session(engine) as session:
        upload = session.get(SyllabusUpload, upload_id)
        if not upload:
            return "Upload not found"
        
        try:
            upload.status = "PROCESSING"
            session.add(upload)
            session.commit()
            
            # Extract skills
            file_path = upload.file_path
            skills = extract_pdf_skills(file_path)
            
            # Save skills to DB
            for skill_name in skills:
                skill_obj = SyllabusSkill(
                    upload_id=upload.id,
                    skill=skill_name,
                    confidence_score=1.0  # Default for vocab matching
                )
                session.add(skill_obj)
            
            upload.status = "COMPLETED"
            session.add(upload)
            session.commit()
            
            return f"Processed {len(skills)} skills"
            
        except Exception as e:
            upload.status = "FAILED"
            session.add(upload)
            session.commit()
            return f"Error: {str(e)}"
