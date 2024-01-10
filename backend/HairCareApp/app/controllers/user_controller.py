import logging

from fastapi import APIRouter, HTTPException, Depends

from app.dependencies import get_current_user_id
from app.dto.user_dto import UserLoginDTO, UserCreateDTO, UserResponseDTO
from app.services.user_service import UserService
from app.utils.jwt_utils import create_access_token

router = APIRouter()
user_service = UserService()


@router.post("/login")
def login(user_login_dto: UserLoginDTO):
    logging.info(f"Login attempt for user: {user_login_dto.email}")

    try:
        user = user_service.login_user(user_login_dto)
        if user:
            return {
                "message": "User successfully logged in",
                "access_token": create_access_token(data={"sub": user.user_id}),
            }
    except ValueError as e:
        logging.error(f"Login error for user {user_login_dto.email}: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    logging.info(f"Login failed for user: {user_login_dto.email}")
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/register")
def register(user_create_dto: UserCreateDTO):
    logging.info(f"Registration attempt for user: {user_create_dto.email}")

    try:
        user = user_service.register_user(user_create_dto)
        if user:
            return {
                "message": "User successfully registered",
                "user_id": user.user_id,
            }
    except ValueError as e:
        logging.error(f"Registration error for user {user_create_dto.email}: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    logging.info(f"Registration failed for user: {user_create_dto.email}")
    raise HTTPException(status_code=401, detail="Registration failed")


@router.get("/view", response_model=UserResponseDTO)
async def get_account_information(current_user_id: str = Depends(get_current_user_id)) -> UserResponseDTO:
    user_info = user_service.get_user_info(current_user_id)
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found.")
    return user_info
