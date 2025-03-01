from sqlalchemy import select
from sqlalchemy.orm import selectinload

from database import *
from events.EventSchemas import *
from users.UserSchemas import * 

class EventRepository:
    @classmethod
    async def add_event(cls, event: SEventStart, organizer: SUser) -> bool:
        async with new_session() as session:
            data = event.model_dump()
            new_event = EventModel(**data)
            session.add(new_event)
            organizer = await session.get(UserModel, organizer.id)
            await session.refresh(new_event, attribute_names=["organizers"])
            new_event.organizers.append(organizer)
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return True
        
    @classmethod
    async def get_event_by_id(cls, event_id: int) -> SEvent:
        async with new_session() as session:
            query = (select(EventModel).filter_by(id=event_id).options(selectinload(EventModel.organizers).load_only(UserModel.id)))
            result = await session.execute(query)
            result = result.scalar()
            res_dict = result.__dict__
            res_dict.pop('_sa_instance_state', None)
            res_dict['organizers'] = [user.id for user in res_dict['organizers']]
            try:
                event = SEvent.model_validate(res_dict)
            except:
                return False
            return event