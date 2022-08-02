from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fileutils import *

app = FastAPI()

origins = ["http://localhost:8000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/files")
async def create_upload_file(file: UploadFile = File(...)):
    name = file.filename
    type = file.content_type
    
    return await speechToText(file,name,type)
