import logging
import uuid
from datetime import datetime

from app.dal.user_dal import UserDAL
from app.dto.user_dto import UserCreateDTO, UserResponseDTO, UserLoginResponseDTO


class UserRepository:
    def __init__(self):
        self.dal = UserDAL()

    def get_user_by_id(self, user_id: str) -> UserResponseDTO | None:
        logging.info(f"Fetching user information for user ID: {user_id}")
        user_data = self.dal.get_user_by_id(user_id)
        return UserResponseDTO(**user_data) if user_data else None

    def register_user(self, user_dto: UserCreateDTO) -> UserResponseDTO | None:
        logging.info(f"Registering user with email: {user_dto.email}")

        # UserCreateDTO should already contain the password hashed
        user_data = user_dto.model_dump()
        user_data["user_id"] = self._generate_user_id()
        self.dal.add_user(user_data)
        return UserResponseDTO(**user_data)

    def get_user_by_email(self, email: str) -> UserResponseDTO | None:
        logging.info(f"Fetching user by email: {email}")

        user_data = self.dal.get_user_by_email(email)
        if user_data:
            return UserResponseDTO(**user_data)
        return None

    def get_user_by_email_with_password(self, email: str) -> UserLoginResponseDTO | None:
        logging.info(f"Fetching user for login: {email}")

        user_data = self.dal.get_user_by_email(email)
        if user_data:
            return UserLoginResponseDTO(**user_data)
        return None

    @staticmethod
    def _generate_user_id() -> str:
        # Generate a UUID based on the host ID, sequence number, and current time
        unique_id = uuid.uuid1()

        # Format the datetime and UUID for a more readable ID
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        user_id = f"{timestamp}-{unique_id.hex[:8]}"
        return user_id
