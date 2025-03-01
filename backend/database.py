from __future__ import annotations

from sqlalchemy import func
from datetime import datetime, date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy import ForeignKey, Table, Column, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional


from settings import database_url


engine = create_async_engine(database_url)
new_session = async_sessionmaker(engine, expire_on_commit=False)

class Model(DeclarativeBase):
    pass



""" class EventM2MModel(Model):
    __tablename__ = "EventM2M"
    organizer_id: Mapped[int] = mapped_column(
        ForeignKey("Users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    event_id: Mapped[int] = mapped_column(
        ForeignKey('Events.id', ondelete="CASCADE"),
        primary_key=True,
    ) """

EventM2MModel = Table(
    "EventM2M",
    Model.metadata,
    Column("left_id", ForeignKey("Events.id"), primary_key=True),
    Column("right_id", ForeignKey("Users.id"), primary_key=True),
)


class EventModel(Model):
    __tablename__ = "Events"
    id: Mapped[int] = mapped_column(primary_key=True)
    event_name: Mapped[str]
    description: Mapped[str]
    short_description: Mapped[str]
    event_datetime: Mapped[datetime]
    place: Mapped[str] # пока не имплементировано
    lat: Mapped[Optional[float]] # пока не имплементировано
    lon: Mapped[Optional[float]]
    organizer_phone: Mapped[Optional[str]]
    organizer_tg: Mapped[Optional[str]]
    organizer_vk: Mapped[Optional[str]]
    schedule: Mapped[Optional[str]] # пока не имплементировано
    direction: Mapped[Optional[str]]

    organizers: Mapped[list[UserModel]] = relationship(
        secondary=EventM2MModel,
        back_populates="organized_events"
    )


class UserModel(Model):
    __tablename__ = "Users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    name: Mapped[str]
    surname: Mapped[str]
    hashed_password: Mapped[str]
    email: Mapped[str]
    birthday: Mapped[date]
    phone_number: Mapped[str]
    role: Mapped[str]

    organized_events: Mapped[Optional[list[EventModel]]] = relationship(
        secondary=EventM2MModel,
        back_populates="organizers"
    )














async def create_tables():
   async with engine.begin() as conn:
       await conn.run_sync(Model.metadata.create_all)

async def delete_tables():
   async with engine.begin() as conn:
       await conn.run_sync(Model.metadata.drop_all)
 