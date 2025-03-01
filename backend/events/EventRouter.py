from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status

from database import *
from auth import get_current_user
from events.EventSchemas import *
from events.EventRepository import *
from users.UserSchemas import *
from users.UserRepository import *

eventRouter = APIRouter(
    prefix='/event',
    tags=['Мероприятия']
)


@eventRouter.post("/add", name="Создать мероприятие")
async def event_add(event: SEventStart, current_user: Annotated[SUser, Depends(get_current_user)]):
    if current_user.role == EUserRole.visitor:
        raise HTTPException(
            status_code=403,
            detail="You do not have rights to add new events",
        )
    await EventRepository.add_event(event, current_user)
    return {"details": "Event created"}

@eventRouter.get('/get/{event_id}', name='Получить мероприятие по его айди')
async def event_get_by_id(event_id: int):
    event = await EventRepository.get_event_by_id(event_id)
    if not event:
        return HTTPException(status_code=404, detail="An event with this id has not yet been created")
    return event