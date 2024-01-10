from typing import List

from app.dto.product_dto import ProductDTO
from app.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self):
        self.product_repository = ProductRepository()

    def get_recommended_products(self, hair_profile: dict, product_type: str) -> List[ProductDTO]:
        return self.product_repository.get_recommended_products(hair_profile, product_type)

    def get_products_by_type(self, product_type: str) -> List[ProductDTO]:
        return self.product_repository.get_products_by_type(product_type)
