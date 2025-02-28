from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional


class SEventStart(BaseModel):
    event_name: str
    desription: str
    short_description: str
    event_datetime: datetime
    place: str # пока не имплементировано
    coords: tuple[float] = Field(default=(53.7773651, 87.2020308)) # пока не имплементировано
    organizer_phone: Optional[str] = Field(pattern=r"(\+7|8)[0-9]{10}")
    organizer_tg: Optional[str]
    organizer_vk: Optional[str]
    schedule: str # пока не имплементировано
    direction: str = Field(default='generic')
    organizers: list[int]

class SEvent(SEventStart):
    id: int