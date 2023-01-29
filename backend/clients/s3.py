import boto3
from botocore.exceptions import ClientError

from config import settings

client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
)


def get_all_sample_urls():
    objects = client.list_objects_v2(Bucket=settings.samples_bucket_name)
    keys = [x['Key'] for x in objects['Contents']]

    all_samples = []
    for key in keys:
        try:
            response = client.generate_presigned_url(
                "get_object",
                Params={"Bucket": settings.samples_bucket_name, "Key": key},
                ExpiresIn=3600,
            )
        except ClientError as e:
            return None
        all_samples.append({
            'name': key,
            'url': response,
        })

    return all_samples
