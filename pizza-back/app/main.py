from fastapi import FastAPI
from app.database import create_db_and_tables
app = FastAPI(title="Restaurant Pizza API", version="1.0.0")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def get_orders():
    return {"message":"Hello world"}