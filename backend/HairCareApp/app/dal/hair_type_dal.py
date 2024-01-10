import boto3
from boto3.dynamodb.conditions import Key


class HairTypeDAL:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('HairType')

    def get_user_hair_type(self, user_id: str):
        response = self.table.query(
            IndexName='UserIdIndex',
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
        return response['Items'][0] if response['Items'] else None
