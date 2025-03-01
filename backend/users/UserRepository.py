from sqlalchemy import select
from sqlalchemy.orm import selectinload

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
            result = await session.execute(select(UserModel).filter_by(username=username).options(selectinload(UserModel.organized_events)))
            result = result.scalar().__dict__
            result.pop('_sa_instance_state', None)
            result['organized_events'] = [ev.id for ev in result['organized_events']]
            try:
                user = SUser.model_validate(result)
            except:
                return False
            return user           