from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

class CollegeBase(SQLModel):
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    city: Optional[str] = None
    university: Optional[str] = None
    college_type: Optional[str] = None  # Engineering, Arts & Science, etc.

class College(CollegeBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CollegeCreate(CollegeBase):
    password: str

class CollegeRead(CollegeBase):
    id: int
    created_at: datetime

class Token(SQLModel):
    access_token: str
    token_type: str

class TokenPayload(SQLModel):
    sub: Optional[int] = None

# --- Phase 2 Models ---

class SyllabusUpload(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    college_id: int = Field(foreign_key="college.id")
    branch: str
    year: str
    file_path: str
    status: str = Field(default="PENDING")  # PENDING, PROCESSING, COMPLETED, FAILED
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    skills: List["SyllabusSkill"] = Relationship(back_populates="upload")

class SyllabusSkill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    upload_id: int = Field(foreign_key="syllabusupload.id")
    skill: str
    confidence_score: float = Field(default=1.0)
    
    # Relationships
    upload: SyllabusUpload = Relationship(back_populates="skills")

class SyllabusUploadRead(SQLModel):
    id: int
    branch: str
    year: str
    status: str
    uploaded_at: datetime

class SyllabusUploadSummary(SyllabusUploadRead):
    skills_count: int

class JobSkill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: str = Field(index=True)
    skill: str = Field(index=True)
    frequency: int = Field(default=0)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

class JobSkillRead(SQLModel):
    role: str
    skill: str
    frequency: int
    last_updated: datetime

class GapResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    college_id: int = Field(foreign_key="college.id")
    upload_id: int = Field(foreign_key="syllabusupload.id")
    target_role: str
    gap_score: float
    covered_skills: str # Store as comma-separated or JSON
    missing_skills: str
    excess_skills: str
    generated_at: datetime = Field(default_factory=datetime.utcnow)

class GapResultRead(SQLModel):
    id: int
    upload_id: int
    target_role: str
    gap_score: float
    covered_skills: List[str]
    missing_skills: List[str]
    excess_skills: List[str]
    generated_at: datetime
