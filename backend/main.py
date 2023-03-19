from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import Sample
from clients import ddb

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
async def get_all_samples():
    return ddb.get_all_samples()


@app.post("/samples")
async def create_sample(sample: Sample):
    return ddb.create_sample(sample)
# @app.post("/samples")
# async def upload_sample(file: UploadFile):
#     s3.upload_sample(file)
    
#     return
