from typing import Optional
from fastapi import APIRouter, Depends, Request
from sqlalchemy import select, func, text
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_admin
from app.models.page_view import PageView
from app.schemas.page_view import PageViewCreate, ViewCountOut
from pydantic import BaseModel

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.post("/view", status_code=202)
async def record_view(
    data: PageViewCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    ip = request.client.host if request.client else None
    ua = request.headers.get("user-agent")

    view = PageView(
        page_path=data.page_path,
        slug=data.slug,
        ip_address=ip,
        user_agent=ua,
    )
    db.add(view)
    # No flush needed — fire and forget (commit happens in get_db)
    return {"accepted": True}


@router.get("/views/{page_path:path}", response_model=ViewCountOut)
async def get_view_count(
    page_path: str,
    db: AsyncSession = Depends(get_db),
):
    # Try materialized view first, fall back to live count
    try:
        result = await db.execute(
            text("SELECT total_views FROM view_counts WHERE page_path = :path"),
            {"path": f"/{page_path}"},
        )
        row = result.fetchone()
        total = row[0] if row else 0
    except Exception:
        # Materialized view not created yet — live count
        result = await db.execute(
            select(func.count(PageView.id)).where(PageView.page_path == f"/{page_path}")
        )
        total = result.scalar_one()

    return ViewCountOut(page_path=f"/{page_path}", total_views=total)


class StatsSummary(BaseModel):
    total_views: int
    top_pages: list


@router.get("/summary", response_model=StatsSummary)
async def get_summary(
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    total_result = await db.execute(select(func.count(PageView.id)))
    total = total_result.scalar_one()

    top_result = await db.execute(
        select(PageView.page_path, func.count(PageView.id).label("views"))
        .group_by(PageView.page_path)
        .order_by(func.count(PageView.id).desc())
        .limit(10)
    )
    top_pages = [{"page_path": row.page_path, "views": row.views} for row in top_result]

    return StatsSummary(total_views=total, top_pages=top_pages)
