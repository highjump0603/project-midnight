from datetime import datetime
from sqlalchemy import BigInteger, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import INET
from app.database import Base


class PageView(Base):
    __tablename__ = "page_views"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    page_path: Mapped[str] = mapped_column(String(500), nullable=False, index=True)
    slug: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    recorded_at: Mapped[datetime] = mapped_column(
        nullable=False, server_default=func.now(), index=True
    )
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(INET, nullable=True)
