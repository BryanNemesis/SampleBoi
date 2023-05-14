#!/usr/bin/python3
# script to upload a ton of samples to s3 and print the urls

import os
import itertools

import boto3


user = os.environ.get("USER")

sample_dirs = [
    f"/Users/{user}/Music/Ableton/User Library/Samples/Lex Luger Kit/Chants (21)",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Lex Luger Kit/Claps & Snares (36)",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Lex Luger Kit/Effects (100)",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Simon Goulding Live Funky Bass Guitar",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Snake Davis Sax",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Warped Phonics",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Toby Baker Retro Keys",
    f"/Users/{user}/Music/Ableton/User Library/Samples/West Coast Hip Hop",
    f"/Users/{user}/Music/Ableton/User Library/Samples/Organic Loop Elements"
    ]

client = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    region_name=os.environ.get("AWS_REGION"),
)

files = itertools.chain(*[os.scandir(dir) for dir in sample_dirs])
wav_file_paths = [f.path for f in files if f.name.endswith('.wav')]


def upload_file_to_s3(file):
    bucket_name = os.environ.get("AWS_SAMPLES_BUCKET_NAME")
    filename = os.path.basename(file.name)
    client.upload_fileobj(file, bucket_name, filename)
    return f"https://{bucket_name}.s3.amazonaws.com/{filename}"

urls = []
for path in wav_file_paths:
    with open(path, 'rb') as file:
        urls.append(upload_file_to_s3(file))
        print(os.path.basename(file.name))

print(urls)




