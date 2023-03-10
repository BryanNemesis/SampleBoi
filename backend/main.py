from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from clients import s3

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
async def samples_list():
    urls = s3.get_all_sample_urls()

    return urls


@app.post("/samples")
async def upload_sample(file: UploadFile):
    s3.upload_sample(file)
    
    return
