from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user_id
from app.dto.wishlist_dto import WishlistProductAddDTO
from app.services.wishlist_service import WishlistService

router = APIRouter()
wishlist_service = WishlistService()


@router.post("/add")
def wishlist_product(
        wishlist_data: WishlistProductAddDTO,
        current_user_id: str = Depends(get_current_user_id),  # In Front-End we'll send the JWT here
):
    try:
        wishlist_item = wishlist_service.wishlist_product(current_user_id, wishlist_data.product_id)
        return wishlist_item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/view")
def see_wishlisted_products(
        current_user_id: str = Depends(get_current_user_id)
):
    try:
        wishlist = wishlist_service.get_user_wishlist(current_user_id)
        return wishlist
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
