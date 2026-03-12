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
        return SiteSettingsOut(social_links=[])
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
        row = SiteSettings(social_links=[link.model_dump() for link in data.social_links])
        db.add(row)
    else:
        row.social_links = [link.model_dump() for link in data.social_links]
    await db.flush()
    await db.refresh(row)
    return row
