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



# Связь ивент - организатор
event_organizer_model = Table( 
    "event_organizers",
    Model.metadata,
    Column("event_id", ForeignKey("Events.id"), primary_key=True),
    Column("organizer_id", ForeignKey("Users.id"), primary_key=True),
)

# Связь ивент - посетитель
event_visitor_model = Table(
    "event_visitors",
    Model.metadata,
    Column("event_id", ForeignKey("Events.id"), primary_key=True),
    Column("visitor_id", ForeignKey("Users.id"), primary_key=True),
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

    photo: Mapped[list[EventPhoto]] = relationship()
    
    visitors: Mapped[list[UserModel]] = relationship(
        secondary=event_visitor_model,
        back_populates="registered_at"
    )

    organizers: Mapped[list[UserModel]] = relationship(
        secondary=event_organizer_model,
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

    registered_at: Mapped[list[EventModel]] = relationship(
        secondary=event_visitor_model,
        back_populates="visitors"
    )

    organized_events: Mapped[Optional[list[EventModel]]] = relationship(
        secondary=event_organizer_model,
        back_populates="organizers"
    )



class EventPhoto(Model):
    __tablename__ = "Event_photo"
    id: Mapped[int] = mapped_column(primary_key=True)
    filename: Mapped[str] = mapped_column(unique=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("Events.id"))










async def create_tables():
   async with engine.begin() as conn:
       await conn.run_sync(Model.metadata.create_all)

async def delete_tables():
   async with engine.begin() as conn:
       await conn.run_sync(Model.metadata.drop_all)
 