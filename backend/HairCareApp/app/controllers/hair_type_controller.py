from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user_id
from app.dto.hair_type_dto import HairTypeDTO
from app.services.hair_type_service import HairTypeService

router = APIRouter()
hair_type_service = HairTypeService()


@router.get("/get", response_model=HairTypeDTO)
async def get_hair_type(
        current_user_id: str = Depends(get_current_user_id)
) -> HairTypeDTO:
    hair_profile = hair_type_service.get_user_hair_profile(current_user_id)
    if not hair_profile:
        raise HTTPException(status_code=404, detail="Hair profile not found.")
    return hair_profile


@router.post("/update", response_model=HairTypeDTO)
async def update_hair_type(
        hair_type_data: HairTypeDTO,
        current_user_id: str = Depends(get_current_user_id)
) -> HairTypeDTO:
    try:
        updated_hair_profile = hair_type_service.update_user_hair_profile(current_user_id, hair_type_data)
        return updated_hair_profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
