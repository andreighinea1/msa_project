from fastapi import APIRouter, HTTPException, Body

from app.dto.product_dto import HairTypeDTO
from app.services.product_service import ProductService

router = APIRouter()
product_service = ProductService()


@router.post("/recommendations")
def get_product_recommendations(
        hair_profile: HairTypeDTO,
        product_type: str = Body(..., embed=True)
):
    try:
        recommended_products = product_service.get_recommended_products(hair_profile.model_dump(), product_type)
        return recommended_products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
