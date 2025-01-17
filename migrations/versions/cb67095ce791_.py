"""empty message

Revision ID: cb67095ce791
Revises: 14c796ddb6b4
Create Date: 2020-05-28 14:10:14.553914

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cb67095ce791'
down_revision = '14c796ddb6b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comment', 'text',
               existing_type=sa.VARCHAR(length=140),
               type_=sa.String(length=2000),
               existing_nullable=True)
    op.alter_column('news', 'date',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=120),
               existing_nullable=False)
    op.alter_column('news', 'filter',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=120),
               existing_nullable=False)
    op.alter_column('news', 'source',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=120),
               existing_nullable=False)
    op.alter_column('update', 'source',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=2000),
               existing_nullable=False)
    op.alter_column('update', 'text',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=2000),
               existing_nullable=False)
    op.add_column('user', sa.Column('ke', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'ke')
    op.alter_column('update', 'text',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
    op.alter_column('update', 'source',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
    op.alter_column('news', 'source',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
    op.alter_column('news', 'filter',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
    op.alter_column('news', 'date',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=20),
               existing_nullable=False)
    op.alter_column('comment', 'text',
               existing_type=sa.String(length=2000),
               type_=sa.VARCHAR(length=140),
               existing_nullable=True)
    # ### end Alembic commands ###
