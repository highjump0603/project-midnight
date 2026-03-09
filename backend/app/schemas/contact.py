import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

    class Config:
        str_min_length = 1
        str_strip_whitespace = True


class ContactOut(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class ContactListOut(BaseModel):
    items: List[ContactOut]
    total: int
