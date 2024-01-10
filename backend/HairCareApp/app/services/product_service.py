from app.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self):
        self.product_repository = ProductRepository()

    def get_recommended_products(self, hair_profile: dict, product_type: str):
        return self.product_repository.get_recommended_products(hair_profile, product_type)
