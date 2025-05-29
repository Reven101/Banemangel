from fastapi import FastAPI
import os
from dotenv import load_dotenv

# Last miljøvariabler fra .env-filen (nyttig for lokal kjøring uten Docker)
load_dotenv()

app = FastAPI()

@app.get("/")
async def root():
    db_url = os.getenv("DATABASE_URL")
    return {"message": "Velkommen til Ledig Tid API!", "database_url_check": db_url}

# Her vil vi legge til flere API-endepunkter senere