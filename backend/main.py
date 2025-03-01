from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import os

from database import create_tables, delete_tables
from auth import authRouter
from events.EventRouter import eventRouter


@asynccontextmanager
async def lifespan(app: FastAPI):
   await create_tables()
   yield



app = FastAPI(lifespan=lifespan, docs_url='/api/docs', openapi_url='/api/openapi.json')

app.add_middleware(
   CORSMiddleware,
   allow_origins=['*'],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

app.include_router(authRouter)
app.include_router(eventRouter)

if __name__ == "__main__":
   if not os.path.exists('backend/db'):
      os.makedirs('backend/db')
   uvicorn.run("main:app", host="localhost", port=8000)