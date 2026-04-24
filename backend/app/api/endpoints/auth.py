from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.core import security
from app.core.config import settings
from app.db.session import get_session
from app.api import deps
from app.models.college import College, CollegeCreate, CollegeRead, Token

router = APIRouter()

@router.post("/register", response_model=CollegeRead)
def register_college(
    *,
    session: Session = Depends(get_session),
    college_in: CollegeCreate
) -> Any:
    """
    Register a new college.
    """
    statement = select(College).where(College.email == college_in.email)
    college = session.exec(statement).first()
    if college:
        raise HTTPException(
            status_code=400,
            detail="A college with this email already exists.",
        )
    
    db_obj = College(
        name=college_in.name,
        email=college_in.email,
        hashed_password=security.get_password_hash(college_in.password),
        city=college_in.city,
        university=college_in.university,
        college_type=college_in.college_type,
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

@router.post("/login", response_model=Token)
def login_access_token(
    session: Session = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    statement = select(College).where(College.email == form_data.username)
    college = session.exec(statement).first()
    if not college or not security.verify_password(form_data.password, college.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            college.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/me", response_model=CollegeRead)
def read_college_me(
    current_college: College = Depends(deps.get_current_college),
) -> Any:
    """
    Get current college info.
    """
    return current_college
