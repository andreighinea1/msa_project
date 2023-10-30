from fastapi import FastAPI
from app.models import user, product, wishlist, hairtype

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to HairCare App API"}
