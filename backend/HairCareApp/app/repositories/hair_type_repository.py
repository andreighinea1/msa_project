from app.dal.hair_type_dal import HairTypeDAL
from app.dto.hair_type_dto import HairTypeDTO


class HairTypeRepository:
    def __init__(self):
        self.dal = HairTypeDAL()

    def get_user_hair_profile(self, user_id: str) -> HairTypeDTO | None:
        hair_type_data = self.dal.get_user_hair_type(user_id)
        return HairTypeDTO(**hair_type_data) if hair_type_data else None

    def update_user_hair_profile(self, user_id: str, hair_type_data: HairTypeDTO) -> HairTypeDTO:
        self.dal.update_user_hair_type(user_id, hair_type_data)
        return hair_type_data
