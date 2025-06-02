from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.database import Pizza, get_session

router = APIRouter(
    prefix="/pizzas", 
    tags=["Pizzas"]
)

@router.get("/", response_model=List[Pizza])
def list_pizzas(session: Session = Depends(get_session)):
    pizzas = session.exec(select(Pizza)).all()
    return pizzas

@router.get("/{pizza_id}", response_model=Pizza)
def get_pizza(pizza_id: UUID, session: Session = Depends(get_session)):
    pizza = session.get(Pizza, pizza_id)
    if not pizza:
        raise HTTPException(status_code=404, detail="Pizza non trouvée")
    return pizza

