from app.dto.hair_type_dto import HairTypeDTO
from app.repositories.hair_type_repository import HairTypeRepository


class HairTypeService:
    def __init__(self):
        self.hair_type_repository = HairTypeRepository()

    def get_user_hair_profile(self, user_id: str) -> HairTypeDTO | None:
        return self.hair_type_repository.get_user_hair_profile(user_id)

    def update_user_hair_profile(self, user_id: str, hair_type_data: HairTypeDTO) -> HairTypeDTO:
        return self.hair_type_repository.update_user_hair_profile(user_id, hair_type_data)
