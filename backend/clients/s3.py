import boto3

from config import settings

client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key_id,
    aws_secret_access_key=settings.aws_secret_access_key,
    region_name=settings.aws_region,
)


def get_all_sample_urls():
    objects = client.list_objects_v2(Bucket=settings.samples_bucket_name)
    sorted_objects = sorted(objects['Contents'], key=lambda x: x['LastModified'])
    keys = [object['Key'] for object in sorted_objects]

    all_samples = []
    for key in keys:
        response = client.generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.samples_bucket_name, "Key": key},
            ExpiresIn=3600,
        )
        all_samples.append({
            'name': key,
            'url': response,
        })

    return all_samples

def upload_sample(file):
    # TODO: do we need to use a context manager here?
    client.upload_fileobj(file.file, settings.samples_bucket_name, file.filename)
