from app.repositories.wishlist_repository import WishlistRepository


class WishlistService:
    def __init__(self):
        self.repository = WishlistRepository()

    def wishlist_product(self, user_id: str, product_id: str):
        return self.repository.add_to_wishlist(user_id, product_id)

    def get_user_wishlist(self, user_id: str):
        return self.repository.get_wishlist_for_user(user_id)
