import logging

import boto3
from boto3.dynamodb.conditions import Key


class UserDAL:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('Users')

    def get_user_by_id(self, user_id: str):
        logging.info(f"Fetching user data for user ID: {user_id}")
        response = self.table.get_item(
            Key={'user_id': user_id}
        )
        return response.get('Item')

    def get_user_by_email(self, email):
        logging.info(f"Attempting to fetch user with email: {email}")

        response = self.table.query(
            IndexName='EmailIndex',
            KeyConditionExpression=Key('email').eq(email)
        )
        return response['Items'][0] if response['Items'] else None

    def add_user(self, user_data):
        logging.info(f"Attempting to add user with email: {user_data['email']}")

        try:
            # 'email' must be a global secondary index, stored as an attribute
            self.table.put_item(
                Item=user_data,
                ConditionExpression='attribute_not_exists(email)'  # This ensures the email is unique
            )
        except self.dynamodb.meta.client.exceptions.ConditionalCheckFailedException:
            logging.error(f"User with email {user_data['email']} already exists.")
            print(f"User with email {user_data['email']} already exists.")
            raise
