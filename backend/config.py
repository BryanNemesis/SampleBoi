from functools import lru_cache

from pydantic import BaseSettings


@lru_cache()
class Settings(BaseSettings):
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    samples_bucket_name: str

    class Config:
        env_file = ".env"

settings = Settings()
