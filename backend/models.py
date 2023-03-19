from pydantic import BaseModel

class Sample(BaseModel):
    name: str
    mode: str
    color: str
    url: str
