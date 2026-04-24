from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from pydantic import ValidationError
from sqlmodel import Session
from app.core import security
from app.core.config import settings
from app.db.session import get_session
from app.models.college import College, TokenPayload

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_current_college(
    session: Session = Depends(get_session),
    token: str = Depends(reusable_oauth2)
) -> College:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_03_FORBIDDEN,
            detail="Could not validate credentials",
        )
    college = session.get(College, token_data.sub)
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    return college
