import os

import boto3

client = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    region_name=os.environ.get("AWS_REGION"),
)


def upload_file_to_s3(file):
    bucket_name = os.environ.get("AWS_SAMPLES_BUCKET_NAME")
    filename = file.name.replace(" ", "_")
    client.upload_fileobj(file.file, bucket_name, filename)
    return f"https://{bucket_name}.s3.amazonaws.com/{filename}"
