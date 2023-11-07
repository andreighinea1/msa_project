import boto3
from boto3.dynamodb.conditions import Key


class UserDAL:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('Users')

    def get_user_by_email(self, email):
        response = self.table.query(
            IndexName='EmailIndex',
            KeyConditionExpression=Key('email').eq(email)
        )
        return response['Items'][0] if response['Items'] else None

    def add_user(self, user_data):
        try:
            # 'email' must be a global secondary index, stored as an attribute
            self.table.put_item(
                Item=user_data,
                ConditionExpression='attribute_not_exists(email)'  # This ensures the email is unique
            )
        except self.dynamodb.meta.client.exceptions.ConditionalCheckFailedException:
            print(f"User with email {user_data['email']} already exists.")
            raise
