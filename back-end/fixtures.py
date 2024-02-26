import datetime

from models import Condition, HourlyWeather, Humidity, Pressure, Temperature, WeatherDay, WindSpeed, Locale
import random
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_engine
from locales import locales

def randomize_time(start: datetime.time, end: datetime.time) -> datetime.time:
    start_seconds = start.hour * 3600 + start.minute * 60 + start.second
    end_seconds = end.hour * 3600 + end.minute * 60 + end.second
    random_seconds = random.randint(start_seconds, end_seconds)
    hours, remainder = divmod(random_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return datetime.time(hours, minutes, seconds)


def generate_fake_weather_day_models(
    start: datetime.date, end: datetime.date, locales: list[Locale]
):
    weather_day_models = []
    for locale in locales:
        for date in range((end - start).days + 1):
            weather_day = WeatherDay(
                country=locale.country,
                date=start + datetime.timedelta(days=date),
                sunrise=randomize_time(datetime.time(6, 0), datetime.time(7, 0)),
                sunset=randomize_time(datetime.time(18, 0), datetime.time(19, 0)),
            )
            weather_day_models.append(weather_day)
    return weather_day_models

def generate_fake_hourly_weather_models(
    weather_day_models: list[WeatherDay]
):
    hourly_weather_models = []
    for weather_day in weather_day_models:
        for hour in range(24):
            temperature: Temperature = {"value": random.randint(-10, 40), "unit": "C"}
            feels_like: Temperature = {"value": random.randint(-10, 40), "unit": "C"}
            humidity: Humidity = {"value": random.randint(0, 100), "unit": "%"}
            wind_speed: WindSpeed = {
                "value": random.randint(0, 100),
                "unit": "km/h",
                "direction": random.choice(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]),
            }
            pressure: Pressure = {"value": random.randint(950, 1050), "unit": "hPa"}
            condition = random.choice(list(Condition))
            hourly_weather = HourlyWeather(
                weather_day=weather_day,
                time=datetime.time(hour, 0),
                temperature=temperature,
                feels_like=feels_like,
                humidity=humidity,
                wind_speed=wind_speed,
                pressure=pressure,
                uv=random.randint(0, 10),
                condition=condition,
                weather_day_id=weather_day.id,
            )
            hourly_weather_models.append(hourly_weather)
    return hourly_weather_models

async def insert_fake_weather_data(session: AsyncSession):

    start = datetime.date.today()
    end = start + datetime.timedelta(days=7)
    weather_day_models = generate_fake_weather_day_models(start, end, locales)
    hourly_weather_models = generate_fake_hourly_weather_models(weather_day_models)
    session.add_all(weather_day_models)
    session.add_all(hourly_weather_models)
    await session.commit()
    await session.close()

async def main():
    async with AsyncSession(async_engine) as session:
        await insert_fake_weather_data(session)


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
