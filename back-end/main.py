import datetime
from typing import Annotated
from fastapi import FastAPI, HTTPException, Path, Query
from fastapi.responses import RedirectResponse
from pydantic import NonNegativeInt, PositiveInt
from sqlmodel import select
from models import WeatherDay, WeatherDayReadWithHourlyWeather
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_engine
from locales import locales
from sqlalchemy.orm import joinedload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("/docs")


@app.get("/weather/{country}", response_model=list[WeatherDayReadWithHourlyWeather])
async def get_weather(
    country: Annotated[str, Path(example="USA")],
    start: Annotated[datetime.date, Query(example=datetime.date.today())],
    end: Annotated[datetime.date, Query(example=datetime.date.today() + datetime.timedelta(days=7))],
    offset: Annotated[NonNegativeInt, Query()] = 0,
    limit: Annotated[PositiveInt, Query(le=100)] = 10,
):
    if start > end:
        raise HTTPException(
            status_code=400, detail="start date must be before end date"
        )
    async with AsyncSession(async_engine) as session:
        statement = (
            select(WeatherDay)
            .options(joinedload(WeatherDay.hourly_weather)) # type: ignore
            .where(
                WeatherDay.country == country,
                WeatherDay.date >= start,
                WeatherDay.date <= end,
            )
            .limit(limit)
            .offset(offset)
        )
        result = await session.execute(statement)
        weather_days = result.unique().scalars().all()
        return weather_days

@app.get("/locale")
async def get_country(
    prompt: str|None = Query(None),
    limit: Annotated[PositiveInt, Query(le=100)] = 10,
):
    if prompt:
        return [locale for locale in locales if prompt.lower() in locale.country.lower()]
    return locales[:limit]
