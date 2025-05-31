from sqlmodel import SQLModel, Field, Relationship, create_engine, Session
from uuid import UUID, uuid4
import datetime
from typing import List, Optional


class Pizza(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(index=True)
    ingredients: List["Ingredients"] = Relationship(back_populates="ingredient")
    price: float
    is_available: bool = Field(default=True)
    orders: List["OrderItem"] = Relationship(back_populates="pizza")


class Ingredients(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    ingredient: str = Field(index=True)
    
class Client(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    nom: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    orders: List["Order"] = Relationship(back_populates="client")

class StoreUser(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Order(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    client_id: UUID = Field(foreign_key="client.id")
    order_date: datetime = Field(default_factory=datetime.utcnow)
    total_amount: float
    status: str = Field(default="pending")
    delivery_address: Optional[str] = None
    client: Client = Relationship(back_populates="orders")
    items: List["OrderItem"] = Relationship(back_populates="order")

class OrderItem(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    order_id: UUID = Field(foreign_key="order.id")
    pizza_id: UUID = Field(foreign_key="pizza.id")
    quantity: int = Field(default=1)
    unit_price: float
    order: Order = Relationship(back_populates="items")
    pizza: Pizza = Relationship(back_populates="orders")
    
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
