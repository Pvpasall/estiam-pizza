from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4


class Pizza(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(index=True)
    ingrédients: str
    price: float

class Client(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    nom: str
        
class Orders(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    client_id: int
    pizza_id: int
    
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"