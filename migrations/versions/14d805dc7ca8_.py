"""empty message

Revision ID: 14d805dc7ca8
Revises: 5eeb3a07d8c5
Create Date: 2024-02-26 19:48:15.936125

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14d805dc7ca8'
down_revision = '5eeb3a07d8c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('session', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url_imagen', sa.String(length=350), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('session', schema=None) as batch_op:
        batch_op.drop_column('url_imagen')

    # ### end Alembic commands ###
