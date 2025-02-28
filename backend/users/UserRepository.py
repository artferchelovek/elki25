from sqlalchemy import select

from database import *
from users.UserModels import *
from users.UserSchemas import *

class UserRepository:
    @classmethod
    async def register_user(cls, user: SUserRegister):
        async with new_session() as session:
            data = user.model_dump()
            data['hashed_password'] = data.pop('password')
            new_user = UserModel(**data)
            session.add(new_user)
            await session.flush()
            await session.commit()
            return True
    
    @classmethod
    async def get_user(cls, username: str) -> SUser:
        async with new_session() as session:
            result = await session.execute(select(UserModel).filter_by(username=username))
            try:
                user = SUser.model_validate(result.scalar())
            except:
                return False
            return user           