from typing import Literal
from pydantic import BaseModel


# TODO: I'd like to use more matching Pydantic types but they're not compatible with DDB deserializer.
class SampleBase(BaseModel):
    name: str
    mode: Literal["oneshot", "start/stop"]
    color: str
    file_url: str


class Sample(SampleBase):
    id: str
    clicks: int
