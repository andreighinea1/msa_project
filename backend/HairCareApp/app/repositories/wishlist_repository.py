import uuid
from typing import List

from app.dal.wishlist_dal import WishlistDAL
from app.dto.wishlist_dto import WishlistProductDTO, CheckWishlistProductDTO


class WishlistRepository:
    def __init__(self):
        self.dal = WishlistDAL()

    def add_to_wishlist(self, user_id: str, product_id: str) -> WishlistProductDTO:
        wishlist_id = str(uuid.uuid4())
        self.dal.add_to_wishlist(user_id, product_id, wishlist_id)
        return WishlistProductDTO(WishlistID=wishlist_id, user_id=user_id, product_id=product_id)

    def remove_from_wishlist(self, user_id: str, product_id: str):
        return self.dal.remove_from_wishlist(user_id, product_id)

    def check_wishlist_product(self, user_id: str, product_id: str) -> CheckWishlistProductDTO:
        return CheckWishlistProductDTO(is_wishlisted=self.dal.get_product_wishlist_id(user_id, product_id) is not None)

    def get_wishlist_for_user(self, user_id: str) -> List[WishlistProductDTO]:
        wishlist_items = self.dal.get_wishlisted_products(user_id)
        return [WishlistProductDTO(**item) for item in wishlist_items]
