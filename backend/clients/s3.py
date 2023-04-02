import boto3

from config import settings
from fastapi import UploadFile

client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
)


def upload_sample(file: UploadFile):
    filename = file.filename.replace(" ", "_")
    client.upload_fileobj(file.file, settings.samples_bucket_name, filename)
    return f"https://{settings.samples_bucket_name}.s3.amazonaws.com/{filename}"
