import logging
from typing import List

import ujson

from app.dal.product_dal import ProductDAL
from app.dto.product_dto import ProductDTO


class ProductRepository:
    def __init__(self):
        self.dal = ProductDAL()

    def get_recommended_products(self, hair_profile: dict, product_type: str) -> List[ProductDTO]:
        product_data = self.dal.get_products_by_type_and_hair_profile(hair_profile, product_type)
        return [ProductDTO(**data) for data in product_data]

    def get_products_by_type(self, product_type: str) -> List[ProductDTO]:
        product_data = self.dal.get_products_by_type(product_type)
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
        return [ProductDTO(**data) for data in product_data]
