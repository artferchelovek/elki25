from pydantic import BaseModel, ConfigDict, Field
from datetime import date
from typing import Optional
from enum import Enum


class EUserRole(str, Enum):
    visitor = 'visitor'
    organizer = 'organizer'

class SUserRegister(BaseModel):
    username: str
    name: str
    surname: str
    password: str
    email: str
    birthday: date
    phone_number: str = Field(pattern=r"(\+7|8)[0-9]{10}")
    role: EUserRole


class SUser(BaseModel):
    id: int
    username: str
    name: str
    surname: str
    hashed_password: str
    email: str
    birthday: date
    phone_number: str = Field(pattern=r"(\+7|8)[0-9]{10}")
    role: EUserRole

    organized_events: Optional[list[int]]

    model_config = ConfigDict(from_attributes=True)