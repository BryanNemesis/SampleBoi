from functools import lru_cache
import logging

from pydantic import BaseSettings


@lru_cache()
class Settings(BaseSettings):
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    samples_bucket_name: str
    ddb_table_name: str

    class Config:
        env_file = ".env"

settings = Settings()


class HealthCheckFilter(logging.Filter):
    def filter(self, record):
        return record.getMessage().find("/health") == -1
