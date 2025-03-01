from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException

from database import *
from places.PlatformSchemas import *
from users.UserSchemas import *

class PlatformRepository:
    @classmethod
    async def get_all_platforms(cls):
        async with new_session() as session:
            query = (select(PlatformPlace)
                     .options(selectinload(PlatformPlace.assigned_events))
                     .options(selectinload(PlatformPlace.photo))
            )
            result = await session.execute(query)
            result = result.scalars().all()
            ans = []
            for res in result:
                res_dict = res.__dict__
                res_dict.pop('_sa_instance_state', None)
                res_dict['assigned_events'] = [x.id for x in res_dict['assigned_events']]
                res_dict['photo'] = [x.filename for x in res_dict['photo']]
                ans.append(res_dict)
            return ans
    
    @classmethod
    async def get_platform_by_id(cls, platform_id: int):
        async with new_session() as session:
            query = (select(PlatformPlace)
                     .filter_by(id=platform_id)
                     .options(selectinload(PlatformPlace.assigned_events))
                     .options(selectinload(PlatformPlace.photo))
            )
            result = await session.execute(query)
            result = result.scalar()
            if result is None:
                raise HTTPException(
                    status_code=404,
                    detail='platform with this ID was not found'
                )
            res_dict = result.__dict__
            res_dict.pop('_sa_instance_state', None)
            res_dict['assigned_events'] = [x.id for x in res_dict['assigned_events']]
            res_dict['photo'] = [x.filename for x in res_dict['photo']]
            try:
                event = SPlatformPlace.model_validate(res_dict)
            except:
                return False
            return event

    @classmethod
    async def new_platform(cls, platform: SPlatformPlaceReg, platform_admin: SUser):
        async with new_session() as session:
            data = platform.model_dump()
            new_platform = PlatformPlace(**data)
            session.add(new_platform)
            new_platform.assigned_admin = platform_admin.id
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return new_platform.id