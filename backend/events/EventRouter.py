from typing import Annotated
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status

from database import *
from auth import get_current_user

eventRouter = APIRouter(
    prefix='/event',
    tags=['Мероприятия']
)


