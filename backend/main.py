from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from database import create_tables, delete_tables
from auth import authRouter

@asynccontextmanager
async def lifespan(app: FastAPI):
   await create_tables()
   print("База готова")
   yield
   #await delete_tables()
   #print("База очищена")


app = FastAPI(lifespan=lifespan, docs_url='/api/docs', openapi_url='/api/openapi.json')

app.add_middleware(
   CORSMiddleware,
   allow_origins=['*'],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

app.include_router(authRouter)

if __name__ == "__main__":
   uvicorn.run("main:app", host="localhost", port=8000)