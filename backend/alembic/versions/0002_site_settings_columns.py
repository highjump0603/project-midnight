"""add site_settings table and new jsonb columns

Revision ID: 0002_site_settings_columns
Revises: 0001_initial
Create Date: 2026-03-12 00:00:00.000000
"""

from typing import Sequence, Union

from alembic import op

revision: str = "0002_site_settings_columns"
down_revision: Union[str, None] = "0001_initial"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS site_settings (
            id uuid PRIMARY KEY,
            social_links jsonb NOT NULL DEFAULT '[]'::jsonb,
            tech_items jsonb NOT NULL DEFAULT '[]'::jsonb,
            timeline_items jsonb NOT NULL DEFAULT '[]'::jsonb,
            updated_at timestamptz NOT NULL DEFAULT now()
        );
        """
    )

    # Backward-compatible for databases where table exists without new columns.
    op.execute(
        """
        ALTER TABLE site_settings
          ADD COLUMN IF NOT EXISTS tech_items JSONB NOT NULL DEFAULT '[]'::jsonb,
          ADD COLUMN IF NOT EXISTS timeline_items JSONB NOT NULL DEFAULT '[]'::jsonb;
        """
    )


def downgrade() -> None:
    op.execute(
        """
        ALTER TABLE site_settings
          DROP COLUMN IF EXISTS timeline_items,
          DROP COLUMN IF EXISTS tech_items;
        """
    )
