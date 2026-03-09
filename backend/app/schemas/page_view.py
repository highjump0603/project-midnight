from typing import Optional
from pydantic import BaseModel


class PageViewCreate(BaseModel):
    page_path: str
    slug: Optional[str] = None


class ViewCountOut(BaseModel):
    page_path: str
    total_views: int
