from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import Optional

from database import *
from users.UserModels import *

class EventModel(Model):
    __tablename__ = "Events"
    id: Mapped[int] = mapped_column(primary_key=True)
    desription: Mapped[str]
    short_description: Mapped[str]
    event_datetime: Mapped[datetime]
    place: Mapped[str] # пока не имплементировано
    #coords: Mapped[list[float]] # пока не имплементировано
    organizer_phone: Mapped[Optional[str]]
    organizer_tg: Mapped[Optional[str]]
    organizer_vk: Mapped[Optional[str]]
    schedule: Mapped[Optional[str]] # пока не имплементировано
    direction: Mapped[Optional[str]]

    organizers: Mapped[list["UserModel"]] = relationship(
        back_populates="organized_events",
        secondary="EventM2M"
    )

class EventM2MModel(Model):
    __tablename__ = "EventM2M"
    organizer_id: Mapped[int] = mapped_column(
        ForeignKey("Users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    event_id: Mapped[int] = mapped_column(
        ForeignKey('Events.id', ondelete="CASCADE"),
        primary_key=True,
    )