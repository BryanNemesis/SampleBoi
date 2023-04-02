from datetime import datetime
from sqlalchemy.orm import Session

from . import models
import schema


def get_samples(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sample).offset(skip).limit(limit).all()


def create_sample(db: Session, sample: schema.SampleCreate):
    db_sample = models.Sample(
        name=sample.name,
        mode=sample.mode,
        color=sample.color.as_hex(),
        file_url=sample.file_url,
        clicks=0,
        time_added=datetime.now().isoformat(),
    )
    db.add(db_sample)
    db.commit()
    db.refresh(db_sample)
    return db_sample
