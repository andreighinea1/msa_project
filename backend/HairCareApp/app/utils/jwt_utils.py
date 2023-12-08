import logging
import os
from datetime import datetime, timedelta
from typing import Any

import jwt
from dotenv import load_dotenv

load_dotenv()  # This loads the environment variables from .env

# Secret key for JWT encoding and decoding
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"


def create_access_token(*, data: dict, expires_delta: timedelta = None) -> str:
    logging.info(f"Creating access token for user: {data.get('sub', 'unknown')}")

    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(payload=to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception) -> Any:
    logging.info("Verifying access token")

    try:
        payload = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError as e:
        logging.error(f"Token verification failed: {e}")
        raise credentials_exception
