from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers import pizza
from app.routers import order
from app.data import create_test_data
from app.database import get_session_obj

app = FastAPI(title="Restaurant Pizza API", version="1.0.0")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    create_test_data(session=get_session_obj())

app.include_router(pizza.router)
app.include_router(order.router)

@app.get("/")
async def get_orders():
    return {"message":"Bienvenue sur PizzaTech API"}

