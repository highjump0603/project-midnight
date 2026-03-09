import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, field_validator


class BlogPostBase(BaseModel):
    title: str
    summary: str
    body: str = ""
    cover_url: Optional[str] = None
    tags: List[str] = []
    reading_time: int = 1
    is_published: bool = False


class BlogPostCreate(BlogPostBase):
    slug: str

    @field_validator("slug")
    @classmethod
    def slug_valid(cls, v: str) -> str:
        import re
        if not re.match(r"^[a-z0-9-]+$", v):
            raise ValueError("Slug must be lowercase alphanumeric with hyphens only")
        return v


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    body: Optional[str] = None
    cover_url: Optional[str] = None
    tags: Optional[List[str]] = None
    reading_time: Optional[int] = None
    is_published: Optional[bool] = None


class BlogPostOut(BlogPostBase):
    id: uuid.UUID
    slug: str
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class BlogPostListOut(BaseModel):
    items: List[BlogPostOut]
    total: int
    limit: int
    offset: int
