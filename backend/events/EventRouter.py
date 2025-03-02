from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
import random


from settings import file_dir
from database import *
from auth import get_current_user
from events.EventSchemas import *
from events.EventRepository import *
from users.UserSchemas import *
from users.UserRepository import *

eventRouter = APIRouter(
    prefix='/api/event',
    tags=['Мероприятия']
)


@eventRouter.post("/add", name="Создать мероприятие")
async def event_add(event: SEventStart, current_user: Annotated[SUser, Depends(get_current_user)]):
    if current_user.role == EUserRole.visitor:
        raise HTTPException(
            status_code=403,
            detail="You do not have rights to add new events",
        )
    id = await EventRepository.add_event(event, current_user)
    if not id:
        return {'я не знаю как эту ошибку обозвать..'}
    return {"details": "Event created", "id": id}


@eventRouter.get('/get/{event_id}', name='Получить мероприятие по его айди')
async def event_get_by_id(event_id: int):
    event = await EventRepository.get_event_by_id(event_id)
    if not event:
        return HTTPException(status_code=404, detail="An event with this id has not yet been created")
    return event


@eventRouter.post('/addPhoto')
async def event_add_photo(event_id: int, uploaded_file: UploadFile, current_user: Annotated[SUser, Depends(get_current_user)]):
    event = await EventRepository.get_event_by_id(event_id)
    if current_user.id not in event.organizers:
        raise HTTPException(
            status_code=403,
            detail='You do not have access to modify this event'
        )
    file = uploaded_file.file
    filename = str(random.randint(1000, 10000)) + '.' + uploaded_file.filename.split('.')[-1]
    photo_id = await EventRepository.add_photo_to_db(filename, event_id)
    with open(f'{file_dir}/{event_id}_{filename}', 'wb') as f:
        f.write(file.read())
    return {'filename': f'{event_id}_{filename}'}

@eventRouter.get('/getAll')
async def event_get_all():
    return await EventRepository.get_all_events()