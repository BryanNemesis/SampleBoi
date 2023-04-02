from sqlalchemy import Column, Integer, String, DateTime

from .db import Base


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    mode = Column(String, index=True)
    color = Column(String, index=True)
    file_url = Column(String, index=True)
    clicks = Column(Integer, index=True)
    time_added = Column(DateTime, index=True)
