import logging

from fastapi import FastAPI

from app.controllers import product_controller, wishlist_controller, hair_type_controller, user_controller

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

app = FastAPI()

app.include_router(user_controller.router, prefix="/auth")
app.include_router(product_controller.router, prefix="/products")
app.include_router(wishlist_controller.router, prefix="/wishlist")
app.include_router(hair_type_controller.router, prefix="/hair-type")


@app.get("/")
def read_root():
    return {"message": "Welcome to HairCare App API"}
