from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from uuid import UUID
from app.database import Order, OrderItem, Client, get_session
from app.schemas import OrderCreate  # On va définir ces schémas pour la requête

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
