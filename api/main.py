import schema
from clients.db import models, crud
from clients.db.db import SessionLocal, engine
from fastapi import FastAPI, Form, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


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


models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
async def health_check():
    return


@app.get("/samples", response_model=list[schema.Sample])
async def get_all_samples(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    samples = crud.get_samples(db, skip=skip, limit=limit)
    return samples


@app.post("/samples")
# TODO: can I put these arguments into a model?
async def create_sample(
    file: UploadFile | None,
    name: str = Form(...),
    mode: str = Form(...),
    color: str = Form(...),
    db: Session = Depends(get_db),
):
    return crud.create_sample(
        db,
        sample=schema.SampleCreate(
            name=name, mode=mode, color=color, file_url=s3.upload_sample(file)
        ),
    )
