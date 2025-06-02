from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.database import Pizza, get_session

router = APIRouter(
    prefix="/pizzas", 
    tags=["Pizzas"]
)

@router.get("/")
def list_pizzas(session: Session = Depends(get_session)):
    pizzas = session.exec(select(Pizza)).all()
    return pizzas