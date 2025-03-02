from pydantic import BaseModel, ConfigDict, Field
from datetime import date
from typing import Optional


class SPlatformAdminReg(BaseModel):
    username: str
    password: str
    email: str
    phone_number: str
    assigned_platform: int

class SPlatformAdmin(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str
    phone_number: str
    assigned_platform: int

class SPlatformPlaceReg(BaseModel):
    name: str
    place: str
    lat: float = Field(default=52.52)
    lon: float = Field(default=52.52)


class SPlatformPlace(SPlatformPlaceReg):
    id: int
    name: str
    assigned_admin: int
    assigned_events: Optional[list[int]] = []
    photo: Optional[list[str]] = []