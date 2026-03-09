import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, HttpUrl, field_validator


class ProjectBase(BaseModel):
    title: str
    summary: str
    description: str = ""
    cover_url: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    tech_tags: List[str] = []
    is_featured: bool = False
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    slug: str

    @field_validator("slug")
    @classmethod
    def slug_valid(cls, v: str) -> str:
        import re
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug must be lowercase alphanumeric with hyphens only")
        return v


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    description: Optional[str] = None
    cover_url: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    tech_tags: Optional[List[str]] = None
    is_featured: Optional[bool] = None
    sort_order: Optional[int] = None


class ProjectOut(ProjectBase):
    id: uuid.UUID
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectListOut(BaseModel):
    items: List[ProjectOut]
    total: int
    limit: int
    offset: int
