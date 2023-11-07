from app.dal.user_dal import UserDAL
from app.dto.user_dto import UserCreateDTO, UserResponseDTO


class UserRepository:
    def __init__(self):
        self.dal = UserDAL()

    def register_user(self, user_dto: UserCreateDTO) -> UserResponseDTO:
        # UserCreateDTO should already contain the password hashed
        user_data = user_dto.model_dump()
        user_data["user_id"] = self._generate_user_id()
        self.dal.add_user(user_data)
        return UserResponseDTO(**user_data)

    def get_user_by_email(self, email: str) -> UserResponseDTO | None:
        user_data = self.dal.get_user_by_email(email)
        if user_data:
            return UserResponseDTO(**user_data)
        return None

    def _generate_user_id(self) -> str:
        # TODO: Implement user ID generation logic
        return "some_unique_user_id"
