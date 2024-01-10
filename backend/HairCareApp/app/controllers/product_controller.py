from fastapi import APIRouter, Depends, HTTPException, Body

from app.dependencies import get_current_user_id
from app.services.hair_type_service import HairTypeService
from app.services.product_service import ProductService

router = APIRouter()
hair_type_service = HairTypeService()
product_service = ProductService()


@router.post("/recommendations")
async def get_product_recommendations(
        current_user_id: str = Depends(get_current_user_id),  # In Front-End we'll send the JWT here
        product_type: str = Body(..., embed=True)
):
    hair_profile = hair_type_service.get_user_hair_profile(current_user_id)
    if not hair_profile:
        raise HTTPException(status_code=400, detail="Hair profile not found.")

    try:
        recommended_products = product_service.get_recommended_products(hair_profile.model_dump(), product_type)
        return recommended_products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
