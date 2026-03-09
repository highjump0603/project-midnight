from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_admin
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactOut, ContactListOut
from pydantic import BaseModel

router = APIRouter(prefix="/api/contact", tags=["contact"])


class SubmitResponse(BaseModel):
    id: str
    message: str


@router.post("", response_model=SubmitResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    data: ContactCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    ip = request.client.host if request.client else None

    contact = Contact(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
        ip_address=ip,
    )
    db.add(contact)
    await db.flush()
    await db.refresh(contact)

    return SubmitResponse(id=str(contact.id), message="Message received. Thank you!")


@router.get("", response_model=ContactListOut)
async def list_contacts(
    limit: int = 50,
    offset: int = 0,
    unread_only: bool = False,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    query = select(Contact).order_by(Contact.created_at.desc())
    count_query = select(func.count(Contact.id))

    if unread_only:
        query = query.where(Contact.is_read == False)
        count_query = count_query.where(Contact.is_read == False)

    total = (await db.execute(count_query)).scalar_one()
    items = (await db.execute(query.limit(limit).offset(offset))).scalars().all()

    return ContactListOut(items=items, total=total)


@router.patch("/{contact_id}/read", response_model=ContactOut)
async def mark_read(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    import uuid as _uuid
    result = await db.execute(select(Contact).where(Contact.id == _uuid.UUID(contact_id)))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    contact.is_read = True
    await db.flush()
    await db.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(
    contact_id: str,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    import uuid as _uuid
    result = await db.execute(select(Contact).where(Contact.id == _uuid.UUID(contact_id)))
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    await db.delete(contact)
