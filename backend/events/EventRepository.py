from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException


from database import *
from events.EventSchemas import *
from users.UserSchemas import * 

class EventRepository:
    @classmethod
    async def add_event(cls, event: SEventStart, organizer: SUser) -> int:
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
            return new_event.id
        
    @classmethod
    async def get_event_by_id(cls, event_id: int) -> SEvent:
        async with new_session() as session:
            query = (select(EventModel)
                     .filter_by(id=event_id)
                     .options(selectinload(EventModel.organizers))
                     .options(selectinload(EventModel.photo))
                     .options(selectinload(EventModel.visitors))
                     )
            result = await session.execute(query)
            result = result.scalar()
            if result is None:
                raise HTTPException(
                    status_code=404,
                    detail='event with this ID was not found'
                )
            res_dict = result.__dict__
            res_dict.pop('_sa_instance_state', None)
            res_dict['organizers'] = [user.id for user in res_dict['organizers']]
            res_dict['photo'] = [photo.filename for photo in res_dict['photo']]
            res_dict['visitors'] = [user.id for user in res_dict['visitors']]
            try:
                event = SEvent.model_validate(res_dict)
            except:
                return False
            return event
        

    @classmethod
    async def add_photo_to_db(cls, filename: str, event_id: int) -> int:
        async with new_session() as session:
            new_photo = EventPhoto(
                filename=str(event_id)+'_'+filename,
                event_id=event_id
            )
            session.add(new_photo)
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return new_photo.id
        

    @classmethod
    async def get_all_events(cls):
        async with new_session() as session:
            result = await session.execute(select(EventModel)
                                           .options(selectinload(EventModel.organizers))
                                           .options(selectinload(EventModel.photo))
                                           .options(selectinload(EventModel.visitors))
                                           )
            result = result.scalars().all()
            ans = []
            for res in result:
                res_dict = res.__dict__
                print(res_dict)
                res_dict.pop('_sa_instance_state', None)
                res_dict['organizers'] = [user.id for user in res_dict['organizers']]
                res_dict['photo'] = [photo.filename for photo in res_dict['photo']]
                res_dict['visitors'] = [photo.visitors for photo in res_dict['visitors']]
                ans.append(SEvent.model_validate(res_dict))
            return ans