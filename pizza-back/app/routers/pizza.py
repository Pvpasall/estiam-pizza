from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from typing import List
from uuid import UUID
from app.database import Pizza, get_session
from app.schemas import PizzaCreate, PizzaUpdate, PizzaResponse

router = APIRouter(
    prefix="/pizzas", 
    tags=["Pizzas"]
)

@router.get("/", response_model=List[PizzaResponse])
def list_pizzas(session: Session = Depends(get_session)):
    statement = select(Pizza).options(selectinload(Pizza.ingredients))
    pizzas = session.exec(statement).all()
    return pizzas

@router.get("/{pizza_id}", response_model=Pizza)
def get_pizza(pizza_id: UUID, session: Session = Depends(get_session)):
    pizza = session.get(Pizza, pizza_id)
    if not pizza:
        raise HTTPException(status_code=404, detail="Pizza non trouvée")
    return pizza

@router.post("/", response_model=Pizza)
def create_pizza(pizza: PizzaCreate, session: Session = Depends(get_session)):
    db_pizza = Pizza(**pizza.dict())
    session.add(db_pizza)
    session.commit()
    session.refresh(db_pizza)
    return db_pizza

@router.put("/{pizza_id}", response_model=Pizza)
def update_pizza(pizza_id: UUID, pizza_update: PizzaUpdate, session: Session = Depends(get_session)):
    pizza = session.get(Pizza, pizza_id)
    if not pizza:
        raise HTTPException(status_code=404, detail="Pizza non trouvée")
    for key, value in pizza_update.dict(exclude_unset=True).items():
        setattr(pizza, key, value)
    session.commit()
    session.refresh(pizza)
    return pizza

@router.delete("/{pizza_id}")
def delete_pizza(pizza_id: UUID, session: Session = Depends(get_session)):
    pizza = session.get(Pizza, pizza_id)
    if not pizza:
        raise HTTPException(status_code=404, detail="Pizza non trouvée")
    session.delete(pizza)
    session.commit()
    return {"message": "Pizza supprimée"}