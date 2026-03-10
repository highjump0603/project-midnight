from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
import bcrypt
from jose import jwt
from pydantic import BaseModel
from app.config import settings
from app.dependencies import get_current_admin

router = APIRouter(prefix="/api/auth", tags=["auth"])


class Token(BaseModel):
    access_token: str
    token_type: str


def create_access_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_expire_minutes)
    return jwt.encode(
        {"sub": subject, "exp": expire},
        settings.app_secret_key,
        algorithm=settings.jwt_algorithm,
    )


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    if form.username != settings.admin_username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not settings.admin_password_hash:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Admin not configured")
    if not bcrypt.checkpw(form.password.encode(), settings.admin_password_hash.encode()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return Token(access_token=create_access_token(form.username), token_type="bearer")


@router.get("/me")
async def me(username: str = Depends(get_current_admin)):
    return {"username": username}
