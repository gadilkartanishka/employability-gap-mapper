from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select
from app.api import deps
from app.db.session import get_session
from app.models.college import College, SyllabusUpload, SyllabusUploadRead, SyllabusUploadSummary, SyllabusSkill
from app.services.storage import storage_service
from app.tasks.syllabus import process_syllabus_task

router = APIRouter()

@router.post("/syllabus", response_model=SyllabusUploadRead)
def upload_syllabus(
    *,
    session: Session = Depends(get_session),
    current_college: College = Depends(deps.get_current_college),
    file: UploadFile = File(...),
    branch: str = Form(...),
    year: str = Form(...)
) -> Any:
    """
    Upload a syllabus PDF.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Save the file
    file_path = storage_service.save_file(file)
    
    # Create DB record
    db_obj = SyllabusUpload(
        college_id=current_college.id,
        branch=branch,
        year=year,
        file_path=file_path,
        status="PENDING"
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    
    # Trigger background task
    process_syllabus_task.delay(db_obj.id)
    
    return db_obj

@router.get("/my-uploads", response_model=List[SyllabusUploadSummary])
def get_my_uploads(
    session: Session = Depends(get_session),
    current_college: College = Depends(deps.get_current_college),
) -> Any:
    """
    Get all syllabus uploads for the current college.
    """
    statement = select(SyllabusUpload).where(SyllabusUpload.college_id == current_college.id)
    uploads = session.exec(statement).all()
    
    results = []
    for upload in uploads:
        # Count skills
        skills_count = len(upload.skills)
        results.append(
            SyllabusUploadSummary(
                id=upload.id,
                branch=upload.branch,
                year=upload.year,
                status=upload.status,
                uploaded_at=upload.uploaded_at,
                skills_count=skills_count
            )
        )
    return results

@router.get("/{upload_id}", response_model=SyllabusUpload)
def get_upload_details(
    upload_id: int,
    session: Session = Depends(get_session),
    current_college: College = Depends(deps.get_current_college),
) -> Any:
    """
    Get details of a specific upload including extracted skills.
    """
    upload = session.get(SyllabusUpload, upload_id)
    if not upload or upload.college_id != current_college.id:
        raise HTTPException(status_code=404, detail="Upload not found")
    return upload
