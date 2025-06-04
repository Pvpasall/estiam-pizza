from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import List, Optional

class ClientCreate(BaseModel):
    nom: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None

class PizzaCreate(BaseModel):
    name: str
    price: float
    is_available: bool = True

class PizzaUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    is_available: Optional[bool]

class OrderItemCreate(BaseModel):
    pizza_id: UUID
    quantity: int
    unit_price: float

class OrderCreate(BaseModel):
    client: ClientCreate
    items: List[OrderItemCreate]
    delivery_address: Optional[str] = None

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    delivery_address: Optional[str] = None

class IngredientResponse(BaseModel):
    id: UUID
    ingredient: str

class PizzaResponse(BaseModel):
    id: UUID
    name: str
    price: float
    is_available: bool
    ingredients: List[IngredientResponse] = []

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    message: str
    user_id: str
    username: str