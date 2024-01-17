from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user_id
from app.dto.product_dto import ProductDTO
from app.dto.wishlist_dto import WishlistProductAddDTO, WishlistProductDTO, WishlistProductRemoveDTO, \
    WishlistProductGetDTO, CheckWishlistProductDTO
from app.services.wishlist_service import WishlistService

router = APIRouter()
wishlist_service = WishlistService()


@router.post("/add", response_model=WishlistProductDTO)
def wishlist_product(
        wishlist_data: WishlistProductAddDTO,
        current_user_id: str = Depends(get_current_user_id),  # In Front-End we'll send the JWT here
) -> WishlistProductDTO:
    try:
        wishlist_item = wishlist_service.wishlist_product(current_user_id, wishlist_data.product_id)
        return wishlist_item
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/remove")
def wishlist_product(
        wishlist_data: WishlistProductRemoveDTO,
        current_user_id: str = Depends(get_current_user_id),  # In Front-End we'll send the JWT here
):
    try:
        wishlist_service.un_wishlist_product(current_user_id, wishlist_data.product_id)
        return
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/get", response_model=CheckWishlistProductDTO)
def wishlist_product(
        wishlist_data: WishlistProductGetDTO,
        current_user_id: str = Depends(get_current_user_id),  # In Front-End we'll send the JWT here
) -> CheckWishlistProductDTO:
    try:
        return wishlist_service.check_wishlist_product(current_user_id, wishlist_data.product_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/view-all", response_model=List[ProductDTO])
def see_wishlisted_products(
        current_user_id: str = Depends(get_current_user_id)
) -> List[ProductDTO]:
    try:
        wishlist = wishlist_service.get_user_wishlist(current_user_id)
        return wishlist
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
