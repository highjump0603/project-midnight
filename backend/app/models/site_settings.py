import uuid
from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database import Base


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    social_links: Mapped[list] = mapped_column(JSONB, nullable=False, default=list)
    tech_items: Mapped[list] = mapped_column(JSONB, nullable=False, server_default="'[]'::jsonb", default=list)
    timeline_items: Mapped[list] = mapped_column(JSONB, nullable=False, server_default="'[]'::jsonb", default=list)
    updated_at: Mapped[datetime] = mapped_column(
        nullable=False, server_default=func.now(), onupdate=func.now()
    )
