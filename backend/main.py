import time
import uuid
from models import Sample
from fastapi import FastAPI, Form, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware


from clients import ddb, s3

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://sampleboi.bryannemesis.de",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return


@app.get("/samples")
async def get_all_samples(sort_by: str) -> list[Sample]:
    return ddb.get_all_samples(sort_by)


@app.post("/samples")
# TODO: can I put these arguments into a model?
async def create_sample(
    file: UploadFile | None,
    name: str = Form(...),
    mode: str = Form(...),
    color: str = Form(...),
) -> Sample:
    sample = Sample(
        name=name,
        mode=mode,
        color=color,
        file_url=s3.upload_sample(file),
        id=str(uuid.uuid4()),
        clicks=0,
        time_added=time.time_ns()
    )
    ddb.save_sample(sample)
    return sample
