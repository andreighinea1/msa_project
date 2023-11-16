from fastapi import APIRouter, HTTPException
from app.services.auth_service import UserService
# from app.utils.jwt_utils import create_access_token
from app.dto.user_dto import UserLoginDTO

router = APIRouter()
auth_service = UserService()


@router.post("/login")
def login(user_login_dto: UserLoginDTO):
    user = auth_service.login_user(user_login_dto)

    if user:
        # return {"access_token": create_access_token(identity=user.id)}
        return {"message": "Login successful", "user_id": user.id}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
