from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile


from users.UserSchemas import *
from users.UserRepository import *
from auth import get_current_user


userRouter = APIRouter(
    prefix='/api/user',
    tags=['Пользователь']
)

@userRouter.post('/subscribe')
async def user_subscribe(event_id: int, current_user: Annotated[SUser, Depends(get_current_user)]):
    if await UserRepository.subscribe_user(current_user.id, event_id):
        return {'details': 'subscribed'}
    
@userRouter.post('/unsubscribe')
async def user_unsubscribe(event_id: int, current_user: Annotated[SUser, Depends(get_current_user)]):
    if await UserRepository.unsubscribe_user(current_user.id, event_id):
        return {'details': 'unsubscribed'}