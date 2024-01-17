import logging
from typing import List

import boto3
from boto3.dynamodb.conditions import Key, Attr


class ProductDAL:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")
        self.table = self.dynamodb.Table("Product")

    def get_products_by_type(self, product_type: str):
        product_type = product_type.lower()
        logging.info(f"Fetching products of type: {product_type}")

        response = self.table.query(
            IndexName='TypeIndex',
            KeyConditionExpression=Key('type').eq(product_type)
        )

        return response["Items"] if response["Items"] else []

    def get_products_by_ids(self, product_ids: List[str]):
        # 'product_id' is the primary key
        response = self.table.scan(
            FilterExpression=Attr('product_id').is_in(product_ids)
        )
        return response["Items"] if response["Items"] else []
