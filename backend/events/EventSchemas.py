from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional


class SEventStart(BaseModel):
    event_name: str
    description: str
    short_description: str
    event_datetime: datetime
    organizer_phone: Optional[str] = Field(pattern=r"(\+7|8)[0-9]{10}")
    organizer_tg: Optional[str] = None
    organizer_vk: Optional[str] = None
    schedule: str # пока не имплементировано
    direction: str = Field(default='generic')
    platform_id: int

class SEvent(SEventStart):
    id: int
    organizers: list[int]
    photo: Optional[list[str]] = []
    visitors: Optional[list[int]] = []
    
    model_config = ConfigDict(from_attributes=True)