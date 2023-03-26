import boto3
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer

from config import settings
from models import Sample

client = boto3.client(
    "dynamodb",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
)


def get_all_samples(sort_by: str):
    # TODO: We'll need some pagination here
    if sort_by == "date":
        scanned_data = client.scan(TableName=settings.ddb_table_name, IndexName='time_added-index')["Items"]
    else:
        scanned_data = client.scan(TableName=settings.ddb_table_name)["Items"]
    deserializer = TypeDeserializer()
    return [
        Sample(**{k: deserializer.deserialize(v) for k, v in sample.items()})
        for sample in scanned_data
    ]


def save_sample(sample: Sample):
    serializer = TypeSerializer()
    client.put_item(
        TableName=settings.ddb_table_name,
        Item={k: serializer.serialize(v) for k, v in sample.dict().items()},
    )
