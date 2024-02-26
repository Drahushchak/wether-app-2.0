from enum import Enum
from typing import Literal, Optional
from pydantic import BaseModel
from sqlmodel import Column, Field, ForeignKey, Integer, Relationship, SQLModel, UniqueConstraint
import datetime
from sqlalchemy.dialects.postgresql import JSON
from typing_extensions import TypedDict

class Locale(BaseModel):
    id: int
    country: str
    timezone: str

class Temperature(TypedDict):
    value: int
    unit: Literal["C", "F"]


class Humidity(TypedDict):
    value: int
    unit: Literal["%"]


class WindSpeed(TypedDict):
    value: int
    unit: Literal["m/s", "km/h", "mph"]
    direction: Literal["N", "NE", "E", "SE", "S", "SW", "W", "NW"]


class Pressure(TypedDict):
    value: int
    unit: Literal["hPa", "inHg"]


class WeatherDayBase(SQLModel):
    country: str = Field(max_length=50, index=True)
    date: datetime.date = Field(index=True)
    sunrise: datetime.time = Field()
    sunset: datetime.time = Field()

class WeatherDay(WeatherDayBase, table=True):
    __table_args__ = (
        UniqueConstraint("country", "date", name="unique_country_date"),
    )
    id: Optional[int] = Field(default=None, primary_key=True)
    hourly_weather: list["HourlyWeather"] = Relationship(
        back_populates="weather_day", sa_relationship_kwargs={"cascade": "all, delete"}
    )

class WeatherDayRead(WeatherDayBase):
    id: int

class Condition(Enum):
    CLOUDY = "cloudy"
    RAINY = "rainy"
    SNOWY = "snowy"
    STORMY = "stormy"
    SUNNY = "sunny"
    WINDY = "windy"

class HourlyWeatherBase(SQLModel):
    time: datetime.time = Field()
    temperature: Temperature = Field(sa_column=Column(JSON))
    feels_like: Temperature = Field(sa_column=Column(JSON))
    humidity: Humidity = Field(sa_column=Column(JSON))
    wind_speed: WindSpeed = Field(sa_column=Column(JSON))
    pressure: Pressure = Field(sa_column=Column(JSON))
    uv: int = Field()
    condition: Condition = Field()
    weather_day_id: Optional[int] = Field(
        default=None, foreign_key="weatherday.id"
    )

class HourlyWeather(HourlyWeatherBase, table=True):
    __table_args__ = (
        UniqueConstraint("weather_day_id", "time", name="unique_weather_day_time"),
    )
    id: Optional[int] = Field(default=None, primary_key=True)
    weather_day: Optional[WeatherDay] = Relationship(back_populates="hourly_weather")

class HourlyWeatherRead(HourlyWeatherBase):
    id: int

class WeatherDayReadWithHourlyWeather(WeatherDayRead):
    hourly_weather: list[HourlyWeatherRead]


class DateRange(BaseModel):
    start: datetime.date
    end: datetime.date
