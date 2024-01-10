from app.repositories.hair_type_repository import HairTypeRepository


class HairTypeService:
    def __init__(self):
        self.hair_type_repository = HairTypeRepository()

    def get_user_hair_profile(self, user_id: str):
        return self.hair_type_repository.get_user_hair_profile(user_id)
