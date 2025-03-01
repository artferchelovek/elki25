from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException


from places.PlatformRepository import *
from places.PlatformSchemas import *
from users.UserSchemas import *
from auth import get_current_user

platformRouter = APIRouter(
    prefix='/platform',
    tags=['Платформы']
)

@platformRouter.get('/getAll')
async def get_all_platforms():
    ans = await PlatformRepository.get_all_platforms()
    return ans

@platformRouter.get('/get/{platform_id}')
async def get_all_platforms(platform_id: int):
    ans = await PlatformRepository.get_platform_by_id(platform_id)
    return ans

@platformRouter.post('/create')
async def create_platform(platform: SPlatformPlaceReg, current_user: Annotated[SUser, Depends(get_current_user)]):
    if current_user.role != EUserRole.platform:
        raise HTTPException(
            status_code=403,
            detail="You do not have rights to add new platforms",
        )
    id = await PlatformRepository.new_platform(platform, current_user)
    if not id:
        return {'я не знаю как эту ошибку обозвать..'}
    return {"details": "Platform created", "id": id}