from fastapi import FastAPI
from app.controllers import auth_controller

app = FastAPI()

app.include_router(auth_controller.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to HairCare App API"}
