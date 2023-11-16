from fastapi import APIRouter, HTTPException
from app.services.auth_service import UserService
from app.utils.jwt_utils import create_access_token
from app.dto.user_dto import UserLoginDTO, UserCreateDTO

router = APIRouter()
user_service = UserService()


@router.post("/login")
def login(user_login_dto: UserLoginDTO):
    try:
        user = user_service.login_user(user_login_dto)
        if user:
            return {"access_token": create_access_token(data={"sub": user.id})}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/register")
def register(user_create_dto: UserCreateDTO):
    try:
        user = user_service.register_user(user_create_dto)
        if user:
            return {"message": "User successfully registered", "user_id": user.id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    raise HTTPException(status_code=401, detail="Registration failed")
