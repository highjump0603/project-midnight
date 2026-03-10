"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-03-11 00:00:00.000000
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "projects",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("slug", sa.String(255), unique=True, nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("summary", sa.Text, nullable=False),
        sa.Column("description", sa.Text, nullable=False, server_default=""),
        sa.Column("cover_url", sa.Text, nullable=True),
        sa.Column("demo_url", sa.Text, nullable=True),
        sa.Column("repo_url", sa.Text, nullable=True),
        sa.Column("tech_tags", postgresql.ARRAY(sa.String), nullable=False, server_default="{}"),
        sa.Column("is_featured", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("sort_order", sa.Integer, nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_projects_slug", "projects", ["slug"])
    op.create_index("ix_projects_is_featured", "projects", ["is_featured"])

    op.create_table(
        "blog_posts",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("slug", sa.String(255), unique=True, nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("summary", sa.Text, nullable=False),
        sa.Column("body", sa.Text, nullable=False, server_default=""),
        sa.Column("cover_url", sa.Text, nullable=True),
        sa.Column("tags", postgresql.ARRAY(sa.String), nullable=False, server_default="{}"),
        sa.Column("reading_time", sa.Integer, nullable=False, server_default="1"),
        sa.Column("is_published", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("published_at", sa.TIMESTAMP(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_blog_posts_slug", "blog_posts", ["slug"])
    op.create_index("ix_blog_posts_is_published", "blog_posts", ["is_published"])

    op.create_table(
        "contacts",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("subject", sa.String(500), nullable=True),
        sa.Column("message", sa.Text, nullable=False),
        sa.Column("ip_address", postgresql.INET, nullable=True),
        sa.Column("is_read", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_contacts_is_read", "contacts", ["is_read"])
    op.create_index("ix_contacts_created_at", "contacts", ["created_at"])

    op.create_table(
        "page_views",
        sa.Column("id", sa.BigInteger, primary_key=True, autoincrement=True),
        sa.Column("page_path", sa.String(500), nullable=False),
        sa.Column("slug", sa.String(255), nullable=True),
        sa.Column("recorded_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.Column("ip_address", postgresql.INET, nullable=True),
    )
    op.create_index("ix_page_views_page_path", "page_views", ["page_path"])
    op.create_index("ix_page_views_slug", "page_views", ["slug"])
    op.create_index("ix_page_views_recorded_at", "page_views", ["recorded_at"])


def downgrade() -> None:
    op.drop_table("page_views")
    op.drop_table("contacts")
    op.drop_table("blog_posts")
    op.drop_table("projects")
