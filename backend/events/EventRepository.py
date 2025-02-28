from sqlalchemy import select

from database import *
from events.EventModels import *
from events.EventSchemas import *

class EventRepository:
    @classmethod
    async def add_event(cls, event: SEventStart):
        async with new_session() as session:
            ...