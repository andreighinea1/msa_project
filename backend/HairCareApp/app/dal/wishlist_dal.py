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

    def remove_from_wishlist(self, user_id: str, product_id: str):
        wishlist_id = self.get_product_wishlist_id(user_id, product_id)

        # Assuming each combination of user_id and product_id is unique
        if wishlist_id:
            self.table.delete_item(
                Key={
                    "WishlistID": wishlist_id
                }
            )
        return

    def get_product_wishlist_id(self, user_id: str, product_id: str) -> str | None:
        # Query to get the WishlistID for the user_id and product_id
        response = self.table.query(
            IndexName='UserIdProductIndex',  # Should have a GSI with user_id and product_id
            KeyConditionExpression=Key('user_id').eq(user_id) & Key('product_id').eq(product_id)
        )
        items = response['Items']

        if items:
            return items[0]['WishlistID']
        return None

    def get_wishlisted_products(self, user_id: str):
        response = self.table.query(
            IndexName='UserIdIndex',
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
        return response['Items']
