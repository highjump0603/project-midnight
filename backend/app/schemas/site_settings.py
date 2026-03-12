from pydantic import BaseModel
from typing import List


class SocialLink(BaseModel):
    label: str
    href: str
    icon: str  # "github" | "email" | "twitter" | "linkedin" | "youtube" | "instagram" | "link"


class SiteSettingsOut(BaseModel):
    social_links: List[SocialLink]

    class Config:
        from_attributes = True


class SiteSettingsUpdate(BaseModel):
    social_links: List[SocialLink]
