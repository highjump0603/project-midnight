from typing import Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_admin
from app.models.blog_post import BlogPost
from app.schemas.blog_post import BlogPostCreate, BlogPostUpdate, BlogPostOut, BlogPostListOut

router = APIRouter(prefix="/api/blog", tags=["blog"])


@router.get("", response_model=BlogPostListOut)
async def list_posts(
    tag: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    # Public endpoint — only published posts
    query = (
        select(BlogPost)
        .where(BlogPost.is_published == True)
        .order_by(BlogPost.published_at.desc())
    )
    count_query = select(func.count(BlogPost.id)).where(BlogPost.is_published == True)

    if tag:
        query = query.where(BlogPost.tags.any(tag))
        count_query = count_query.where(BlogPost.tags.any(tag))

    total = (await db.execute(count_query)).scalar_one()
    items = (await db.execute(query.limit(limit).offset(offset))).scalars().all()

    return BlogPostListOut(items=items, total=total, limit=limit, offset=offset)


@router.get("/{slug}", response_model=BlogPostOut)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost).where(BlogPost.slug == slug, BlogPost.is_published == True)
    )
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post


@router.post("", response_model=BlogPostOut, status_code=status.HTTP_201_CREATED)
async def create_post(
    data: BlogPostCreate,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    existing = await db.execute(select(BlogPost).where(BlogPost.slug == data.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")

    post_data = data.model_dump()
    if post_data.get("is_published") and not post_data.get("published_at"):
        post_data["published_at"] = datetime.now(timezone.utc)

    post = BlogPost(**post_data)
    db.add(post)
    await db.flush()
    await db.refresh(post)
    return post


@router.put("/{slug}", response_model=BlogPostOut)
async def update_post(
    slug: str,
    data: BlogPostUpdate,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

    update_data = data.model_dump(exclude_unset=True)

    # Auto-set published_at when publishing for the first time
    if update_data.get("is_published") and not post.is_published and not post.published_at:
        update_data["published_at"] = datetime.now(timezone.utc)

    for field, value in update_data.items():
        setattr(post, field, value)

    await db.flush()
    await db.refresh(post)
    return post


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    slug: str,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    await db.delete(post)
