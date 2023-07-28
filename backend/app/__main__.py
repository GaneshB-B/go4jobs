import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import post, status, appn
from config.env import *

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(post.router)
app.include_router(status.router)
app.include_router(appn.router)


@app.get("/", tags=["Root"])
def read_root() -> dict:
    return {"message": "Welcome to go4jobs"}

uvicorn.run(app, port=SERVER_PORT)