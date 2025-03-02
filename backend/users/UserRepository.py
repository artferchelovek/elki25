from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException


from database import *
from users.UserSchemas import *

class UserRepository:
    @classmethod
    async def register_user(cls, user: SUserRegister):
        async with new_session() as session:
            data = user.model_dump()
            data['hashed_password'] = data.pop('password')
            new_user = UserModel(**data)
            session.add(new_user)
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return True
    
    @classmethod
    async def get_user(cls, username: str) -> SUser:
        async with new_session() as session:
            result = await session.execute(select(UserModel)
                                           .filter_by(username=username)
                                           .options(selectinload(UserModel.organized_events))
                                           .options(selectinload(UserModel.registered_at))
                                           )
            result = result.scalar().__dict__
            result.pop('_sa_instance_state', None)
            result['organized_events'] = [ev.id for ev in result['organized_events']]
            result['registered_at'] = [ev.id for ev in result['registered_at']]
            try:
                user = SUser.model_validate(result)
            except:
                return False
            return user


    @classmethod
    async def subscribe_user(cls, user_id: int, event_id: int):
        async with new_session() as session:
            try:
                user = await session.execute(select(UserModel).filter_by(id=user_id).options(selectinload(UserModel.registered_at)))
                user = user.scalar()
            except:
                raise HTTPException(
                    status_code=404,
                    details='user not found'
                )
            try:
                event = await session.execute(select(EventModel).filter_by(id=event_id))
                event = event.scalar()
            except:
                raise HTTPException(
                    status_code=404,
                    detail='event not found'
                )
            user.registered_at.append(event)
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return True

    @classmethod
    async def unsubscribe_user(cls, user_id: int, event_id: int):
        async with new_session() as session:
            try:
                user = await session.execute(select(UserModel).filter_by(id=user_id).options(selectinload(UserModel.registered_at)))
                user = user.scalar()
            except:
                raise HTTPException(
                    status_code=404,
                    details='user not found'
                )
            try:
                event = await session.execute(select(EventModel).filter_by(id=event_id))
                event = event.scalar()
            except:
                raise HTTPException(
                    status_code=404,
                    detail='event not found'
                )
            user.registered_at.remove(event)
            try:
                await session.flush()
                await session.commit()
            except:
                return False
            return True