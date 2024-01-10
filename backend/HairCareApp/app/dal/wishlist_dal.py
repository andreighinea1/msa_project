import boto3
from boto3.dynamodb.conditions import Key


class WishlistDAL:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")
        self.table = self.dynamodb.Table("Wishlist")

    def add_to_wishlist(self, user_id: str, product_id: str, wishlist_id: str):
        self.table.put_item(
            Item={
                "WishlistID": wishlist_id,
                "user_id": user_id,
                "product_id": product_id
            }
        )

    def get_wishlisted_products(self, user_id: str):
        response = self.table.query(
            IndexName='UserIdIndex',
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
        return response['Items']
