from typing import List

from app.dto.wishlist_dto import WishlistProductDTO
from app.repositories.wishlist_repository import WishlistRepository


class WishlistService:
    def __init__(self):
        self.repository = WishlistRepository()

    def wishlist_product(self, user_id: str, product_id: str) -> WishlistProductDTO:
        return self.repository.add_to_wishlist(user_id, product_id)

    def un_wishlist_product(self, user_id: str, product_id: str):
        return self.repository.remove_from_wishlist(user_id, product_id)

    def get_user_wishlist(self, user_id: str) -> List[WishlistProductDTO]:
        return self.repository.get_wishlist_for_user(user_id)
