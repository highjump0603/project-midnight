from pydantic import BaseModel
from typing import List, Optional


class SocialLink(BaseModel):
    label: str
    href: str
    icon: str


class TechItem(BaseModel):
    name: str
    icon_key: str
    color: str
    category: str
    proficiency: int
    duration: str


class TimelineItem(BaseModel):
    year: str
    title: str
    description: str
    type: str  # "학업" | "경력" | "프로젝트" | "대외활동" | "수상"
    award_image: Optional[str] = None


class SiteSettingsOut(BaseModel):
    social_links: List[SocialLink]
    tech_items: List[TechItem]
    timeline_items: List[TimelineItem]

    class Config:
        from_attributes = True


class SiteSettingsUpdate(BaseModel):
    social_links: Optional[List[SocialLink]] = None
    tech_items: Optional[List[TechItem]] = None
    timeline_items: Optional[List[TimelineItem]] = None
