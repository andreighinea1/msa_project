from fastapi import Depends, HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordBearer

from app.utils.jwt_utils import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user_id(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credentials_exception).get("sub")
