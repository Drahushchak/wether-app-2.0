
from typing import Any
from pydantic import PostgresDsn, validator
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    VERSION: str = "0.0.1"
    PROJECT_NAME: str = "FastAPI Weather API"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_DB: str = "weather"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_ECHO: bool = False
    POSTGRES_POOL_SIZE: int = 10
    POSTGRES_URI: PostgresDsn | None = None
    ASYNC_POSTGRES_URI: PostgresDsn | None = None


    class Config:
        case_sensitive = True
        env_file = ".env"

    @classmethod
    def get_dsn(cls, schema: str, values: dict[str, Any]) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme=schema,
            username=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_HOST"),
            port=values.get("POSTGRES_PORT"),
            path=f"{values.get('POSTGRES_DB') or ''}",
        )

    @validator("ASYNC_POSTGRES_URI", pre=True)
    def assemble_async_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return cls.get_dsn("postgresql+asyncpg", values)

    @validator("POSTGRES_URI", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return cls.get_dsn("postgresql", values)




settings = Settings()
