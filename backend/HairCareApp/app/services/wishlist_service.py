from typing import List

from app.dto.product_dto import ProductDTO
from app.dto.wishlist_dto import WishlistProductDTO, CheckWishlistProductDTO
from app.repositories.product_repository import ProductRepository
from app.repositories.wishlist_repository import WishlistRepository


class WishlistService:
    def __init__(self):
        self.repository = WishlistRepository()
        self.product_repository = ProductRepository()

    def wishlist_product(self, user_id: str, product_id: str) -> WishlistProductDTO:
        return self.repository.add_to_wishlist(user_id, product_id)

    def un_wishlist_product(self, user_id: str, product_id: str):
        return self.repository.remove_from_wishlist(user_id, product_id)

    def check_wishlist_product(self, user_id: str, product_id: str) -> CheckWishlistProductDTO:
        return self.repository.check_wishlist_product(user_id, product_id)

    def get_user_wishlist(self, user_id: str) -> List[ProductDTO]:
        wishlist_items = self.repository.get_wishlist_for_user(user_id)
        product_ids = [item.product_id for item in wishlist_items]
        return self.product_repository.get_products_by_ids(product_ids)
