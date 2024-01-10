import logging

import bcrypt

from app.dto.user_dto import UserCreateDTO, UserLoginDTO, UserResponseDTO, UserLoginResponseDTO
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def get_user_info(self, user_id: str) -> UserResponseDTO | None:
        logging.info(f"Fetching user information for user ID: {user_id}")
        return self.user_repository.get_user_by_id(user_id)

    def register_user(self, user_create_dto: UserCreateDTO) -> UserResponseDTO | None:
        logging.info(f"User registration started for email: {user_create_dto.email}")

        # Check if password == confirm_password
        if user_create_dto.password != user_create_dto.confirm_password:
            raise ValueError(f"The passwords do not match!")

        # Check if user already exists
        existing_user = self.user_repository.get_user_by_email(user_create_dto.email)
        if existing_user:
            raise ValueError(f"An account with email {user_create_dto.email} already exists.")

        # Hash the password
        hashed_password = self._hash_password(user_create_dto.password)
        user_create_dto.password = hashed_password

        # Save user and return the response DTO
        return self.user_repository.register_user(user_create_dto)

    def login_user(self, user_login_dto: UserLoginDTO) -> UserResponseDTO | None:
        logging.info(f"User login attempt for email: {user_login_dto.email}")

        user_dto: UserLoginResponseDTO = self.user_repository.get_user_by_email_with_password(user_login_dto.email)
        if user_dto and self._check_password(user_login_dto.password, user_dto.password):
            user_data = user_dto.model_dump()
            del user_data["password"]
            return UserResponseDTO(**user_data)
        return None

    @staticmethod
    def _hash_password(plain_text_password: str) -> str:
        hashed = bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())
        return hashed.decode("utf-8")

    @staticmethod
    def _check_password(plain_text_password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(plain_text_password.encode("utf-8"), hashed_password.encode("utf-8"))
