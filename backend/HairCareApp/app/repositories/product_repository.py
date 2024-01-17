from typing import List

import ujson

from app.dal.product_dal import ProductDAL
from app.dto.product_dto import ProductDTO


class ProductRepository:
    def __init__(self):
        self.dal = ProductDAL()

    def get_products_by_ids(self, product_ids: List[str]) -> List[ProductDTO]:
        product_data = self.dal.get_products_by_ids(product_ids)
        product_data = self._convert_products_to_dto(product_data)
        return [ProductDTO(**data) for data in product_data]

    def get_recommended_products(self, hair_profile: dict, product_type: str) -> List[ProductDTO]:
        # Fetch products by type
        product_data = self.dal.get_products_by_type(product_type)
        product_data = self._convert_products_to_dto(product_data)

        # Filter products based on suitability with user's hair profile
        suitable_products = [
            data for data in product_data
            if self._check_suitable_hair_types(data["suitable_hair_types"], hair_profile)
        ]

        # Convert suitable products to DTOs
        return [ProductDTO(**data) for data in suitable_products]

    def get_products_by_type(self, product_type: str) -> List[ProductDTO]:
        product_data = self.dal.get_products_by_type(product_type)
        product_data = self._convert_products_to_dto(product_data)
        return [ProductDTO(**data) for data in product_data]

    @staticmethod
    def _convert_products_to_dto(product_data):
        product_data = [
            {
                # "product_id": data["product_id"],
                # "name": data["name"],
                # "type": data["type"],
                # "price": data.get("price", "Unknown"),
                # "url": data["url"],
                **data,
                "description": data["description"].removeprefix('"').removesuffix('"'),
                "suitable_hair_types": {
                    category: concern["S"]
                    for category, concern in ujson.loads(data["suitable_hair_types"]).items()
                },
            }
            for data in product_data
        ]
        return product_data

    # @staticmethod
    # def _check_suitable_hair_types(a, b):
    #     if len(a) != len(b):
    #         return False
    #     for k1, v1 in a.items():
    #         if k1 not in b:
    #             return False
    #         if v1.lower() != b[k1].lower():
    #             return False
    #     return True
    @staticmethod
    def _check_suitable_hair_types(a, b):
        # Convert both dictionaries to lowercase for case-insensitive comparison
        a = {k.lower(): v.lower() for k, v in a.items()}
        b = {k.lower(): v.lower() for k, v in b.items()}

        # Check if all items in user_hair_profile are in product_hair_types
        return a == b
