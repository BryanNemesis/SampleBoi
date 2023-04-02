from datetime import datetime
from typing import Literal
from pydantic import BaseModel, HttpUrl
from pydantic.color import Color


class SampleBase(BaseModel):
    name: str
    mode: Literal["oneshot", "start/stop"]
    color: Color
    file_url: HttpUrl


class SampleCreate(SampleBase):
    pass


class Sample(SampleBase):
    id: str
    time_added: datetime
    clicks: int

    class Config:
        orm_mode = True
