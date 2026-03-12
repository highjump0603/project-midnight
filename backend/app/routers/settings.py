from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_admin
from app.models.site_settings import SiteSettings
from app.schemas.site_settings import SiteSettingsOut, SiteSettingsUpdate

router = APIRouter(prefix="/api/settings", tags=["settings"])


@router.get("", response_model=SiteSettingsOut)
async def get_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteSettings))
    row = result.scalar_one_or_none()
    if not row:
        return SiteSettingsOut(social_links=[], tech_items=[], timeline_items=[])
    return row


@router.put("", response_model=SiteSettingsOut)
async def update_settings(
    data: SiteSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    result = await db.execute(select(SiteSettings))
    row = result.scalar_one_or_none()
    if not row:
        row = SiteSettings(
            social_links=[l.model_dump() for l in (data.social_links or [])],
            tech_items=[t.model_dump() for t in (data.tech_items or [])],
            timeline_items=[t.model_dump() for t in (data.timeline_items or [])],
        )
        db.add(row)
    else:
        if data.social_links is not None:
            row.social_links = [l.model_dump() for l in data.social_links]
        if data.tech_items is not None:
            row.tech_items = [t.model_dump() for t in data.tech_items]
        if data.timeline_items is not None:
            row.timeline_items = [t.model_dump() for t in data.timeline_items]
    await db.flush()
    await db.refresh(row)
    return row
