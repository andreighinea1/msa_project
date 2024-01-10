import logging

from fastapi import FastAPI

from app.controllers import auth_controller, product_controller

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

app = FastAPI()

app.include_router(auth_controller.router, prefix="/auth")
app.include_router(product_controller.router, prefix="/products")


@app.get("/")
def read_root():
    return {"message": "Welcome to HairCare App API"}
