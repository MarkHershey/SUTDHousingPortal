from fastapi import Depends, FastAPI, HTTPException
from markkk.logger import logger

from . import routes

app = FastAPI()


app.include_router(routes.apexs.router)
app.include_router(routes.applications.router)
app.include_router(routes.auth.router)
app.include_router(routes.events.router)
app.include_router(routes.records.router)
app.include_router(routes.students.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}


@app.get("/")
async def index():
    return {"message": "Hello from SUTD Housing Portal"}
