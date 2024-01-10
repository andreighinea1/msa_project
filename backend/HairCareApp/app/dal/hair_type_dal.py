import logging

import boto3
from boto3.dynamodb.conditions import Key

from app.dto.hair_type_dto import HairTypeDTO


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

    def update_user_hair_type(self, user_id: str, hair_type_data: HairTypeDTO):
        logging.info(f"Updating hair type for user ID: {user_id}")

        self.table.update_item(
            Key={'user_id': user_id},
            UpdateExpression="set health = :h, texture = :t, strand_thickness = :st, "
                             "scalp_condition = :sc, hair_concern = :hc",
            ExpressionAttributeValues={
                ':h': hair_type_data.health,
                ':t': hair_type_data.texture,
                ':st': hair_type_data.strand_thickness,
                ':sc': hair_type_data.scalp_condition,
                ':hc': hair_type_data.hair_concern
            }
        )
