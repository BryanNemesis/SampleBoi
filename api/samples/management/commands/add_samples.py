import json
import os
import random

from django.core.management.base import BaseCommand
from faker import Faker

from samples.models import Sample
from samples.s3 import client


fake = Faker()

class Command(BaseCommand):
    help = "Adds a shitload of samples for testing purposes"

    def handle(self, *args, **options):
        self.stdout.write('Adding samples. Les gooo')
        with open(
            os.path.join(os.getcwd(), "samples/management/commands/samples_list.json"),
            "rb",
        ) as urls_file:
            urls = json.load(urls_file)

        random.shuffle(urls)

        for url in urls:

            size = client.get_object_attributes(
                Bucket=os.environ.get("AWS_SAMPLES_BUCKET_NAME"),
                Key=url.rsplit("/", 1)[-1],
                ObjectAttributes=["ObjectSize"],
            ).get('ObjectSize', 0)

            sample = Sample(
                name=fake.text(max_nb_chars=15)[:-1],
                mode='START_STOP' if size > 1_000_000 else 'ONESHOT',
                color=fake.color(),
                file_url=url,
            )

            sample.save()

            self.stdout.write(f'Sample {url.rsplit("/", 1)[-1]} added as {sample.name}')
        
        self.stdout.write(self.style.SUCCESS(f'{len(urls)} samples added!!!!!'))

