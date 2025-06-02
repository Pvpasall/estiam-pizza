from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from uuid import UUID
from app.database import Order, OrderItem, Client, get_session
from app.schemas import OrderCreate, OrderUpdate  

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/")
def create_order(order_data: OrderCreate, session: Session = Depends(get_session)):
    client = session.query(Client).filter_by(email=order_data.client.email).first()
    
    if not client:
        client = Client(
            nom=order_data.client.nom,
            email=order_data.client.email,
            phone=order_data.client.phone,
            address=order_data.client.address
        )
        session.add(client)
        session.commit()
        session.refresh(client)

    total = sum(item.quantity * item.unit_price for item in order_data.items)

    new_order = Order(
        client_id=client.id,
        total_amount=total,
        delivery_address=order_data.delivery_address,
    )
    session.add(new_order)
    session.commit()
    session.refresh(new_order)

    for item in order_data.items:
        order_item = OrderItem(
            order_id=new_order.id,
            pizza_id=item.pizza_id,
            quantity=item.quantity,
            unit_price=item.unit_price
        )
        session.add(order_item)

    session.commit()
    return {"message": "Commande créée", "order_id": str(new_order.id)}

@router.get("/", response_model=List[Order])
def list_orders(session: Session = Depends(get_session)):
    return session.exec(select(Order)).all()

@router.get("/{order_id}", response_model=Order)
def get_order(order_id: UUID, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    return order

@router.put("/{order_id}", response_model=Order)
def update_order(order_id: UUID, update: OrderUpdate, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(order, key, value)
    session.commit()
    session.refresh(order)
    return order

@router.delete("/{order_id}")
def delete_order(order_id: UUID, session: Session = Depends(get_session)):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    session.delete(order)
    session.commit()
    return {"message": "Commande supprimée"}