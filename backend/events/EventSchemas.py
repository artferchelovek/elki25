from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional

from database import *


class SEventStart(BaseModel):
    event_name: str
    description: str
    short_description: str
    event_datetime: datetime
    place: str # пока не имплементировано
    lat: float = Field(default=53.7773651) # пока не имплементировано
    lon: float = Field(default=87.2020308)
    organizer_phone: Optional[str] = Field(pattern=r"(\+7|8)[0-9]{10}")
    organizer_tg: Optional[str] = None
    organizer_vk: Optional[str] = None
    schedule: str # пока не имплементировано
    direction: str = Field(default='generic')

    photo: Optional[list[str]] = []


class SEvent(SEventStart):
    id: int
    organizers: list[int]
    model_config = ConfigDict(from_attributes=True)