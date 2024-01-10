import logging

import boto3
from boto3.dynamodb.conditions import Attr


class ProductDAL:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")
        self.table = self.dynamodb.Table("Products")

    def get_products_by_hair_profile(self, hair_profile: dict, product_type: str):
        # Construct the filter expression based on the hair profile
        filter_expression = Attr("type").eq(product_type)
        for key, value in hair_profile.items():
            filter_expression &= Attr(f"suitable_hair_types.{key}").is_in(value)

        logging.info(f"Fetching products for hair profile: {hair_profile} and type {product_type}")

        # Scan the table with the constructed filter expression
        response = self.table.scan(
            FilterExpression=filter_expression
        )
        return response['Items'] if response['Items'] else []
