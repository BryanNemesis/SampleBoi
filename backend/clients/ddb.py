import random

import boto3
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer

from config import settings
from models import Sample

client = boto3.client(
    "dynamodb",
    # TODO: change these settings to be dev/prod
    endpoint_url="http://db:8000",
    aws_access_key_id="",
    aws_secret_access_key="",
    # aws_access_key_id=settings.aws_access_key_id,
    # aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
)


def get_all_samples():
    # TODO: We'll need some pagination here
    scanned_data = client.scan(TableName=settings.ddb_table_name)["Items"]
    deserializer = TypeDeserializer()
    return [
        Sample(**{k: deserializer.deserialize(v) for k, v in sample.items()})
        for sample in scanned_data
    ]


def create_sample(sample: Sample):
    item = {**sample.dict(), "id": random.randint(0, 999999), "clicks": 0}
    serializer = TypeSerializer()
    return client.put_item(
        TableName=settings.ddb_table_name,
        Item={k: serializer.serialize(v) for k, v in item.items()},
    )
