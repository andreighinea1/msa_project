import logging

import boto3
from boto3.dynamodb.conditions import Key


class ProductDAL:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")
        self.table = self.dynamodb.Table("Product")

    # def get_products_by_type_and_hair_profile(self, hair_profile: dict, product_type: str):
    #     # Construct the filter expression based on the hair profile
    #     filter_expression = Attr("type").eq(product_type)
    #     # for key, value in hair_profile.items():
    #     #     # filter_expression &= Attr("suitable_hair_types").eq(f"{key}.S.{value}")
    #     #     filter_expression &= Attr(f"suitable_hair_types").contains(f"{key}")
    #
    #     logging.info(f"Fetching products for type '{product_type}' and hair profile: {hair_profile}")
    #
    #     # Scan the table with the constructed filter expression
    #     response = self.table.scan(
    #         FilterExpression=filter_expression
    #     )
    #     return response["Items"] if response["Items"] else []

    def get_products_by_type(self, product_type: str):
        product_type = product_type.lower()
        logging.info(f"Fetching products of type: {product_type}")

        response = self.table.query(
            IndexName='TypeIndex',
            KeyConditionExpression=Key('type').eq(product_type)
        )

        return response["Items"] if response["Items"] else []
