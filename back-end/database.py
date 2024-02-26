from sqlalchemy.ext.asyncio import create_async_engine
from models import SQLModel
from settings import settings
from sqlmodel import create_engine

async_engine = create_async_engine(
    str(settings.ASYNC_POSTGRES_URI),
    echo=settings.POSTGRES_ECHO,
    future=True,
    pool_size=max(5, settings.POSTGRES_POOL_SIZE),
)

engine = create_engine(
    str(settings.POSTGRES_URI),
)

if __name__ == "__main__":
    SQLModel.metadata.create_all(engine)
