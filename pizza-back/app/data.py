from uuid import uuid4
from sqlmodel import Session, create_engine
from app.database import Ingredients, Pizza

ingredients_data = [
    {"ingredient": "Mozzarella"},
    {"ingredient": "Sauce tomate"},
    {"ingredient": "Pepperoni"},
    {"ingredient": "Champignons"},
    {"ingredient": "Poivrons"},
    {"ingredient": "Saucisse italienne"},
    {"ingredient": "Oignons"},
    {"ingredient": "Olives noires"},
    {"ingredient": "Ananas"},
    {"ingredient": "Jambon"},
    {"ingredient": "Basilic"},
    {"ingredient": "Parmesan"},
    {"ingredient": "Épinards"},
    {"ingredient": "Fromage de chèvre"},
    {"ingredient": "Tomates séchées"},
    {"ingredient": "Prosciutto"},
    {"ingredient": "Roquette"},
    {"ingredient": "Chorizo"},
    {"ingredient": "Piments jalapeños"},
    {"ingredient": "Lardons"},
    {"ingredient": "Gorgonzola"},
    {"ingredient": "Artichauts"},
    {"ingredient": "Câpres"},
    {"ingredient": "Thon"}
]

pizza_data = [
    {
        "name": "Margherita",
        "price": 12.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Basilic"]
    },
    {
        "name": "Regina",
        "price": 14.50,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Jambon", "Champignons"]
    },
    {
        "name": "Quatre Saisons",
        "price": 16.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Jambon", "Champignons", "Artichauts", "Olives noires"]
    },
    {
        "name": "Hawai",
        "price": 15.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Jambon", "Ananas"]
    },
    {
        "name": "Végétarienne",
        "price": 15.50,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Poivrons", "Champignons", "Oignons", "Olives noires", "Épinards"]
    },
    {
        "name": "Carnivore",
        "price": 19.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Pepperoni", "Saucisse italienne", "Jambon", "Lardons", "Chorizo"]
    },
    {
        "name": "Méditerranéenne",
        "price": 17.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Fromage de chèvre", "Olives noires", "Tomates séchées", "Roquette"]
    },
    {
        "name": "Sicilienne",
        "price": 16.50,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Thon", "Câpres", "Olives noires", "Oignons"]
    },
    {
        "name": "Forestière",
        "price": 15.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Champignons", "Lardons", "Parmesan"]
    },
    {
        "name": "Calzone",
        "price": 14.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Jambon", "Champignons"]
    },
    {
        "name": "Spéciale du Chef",
        "price": 20.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Prosciutto", "Gorgonzola", "Roquette", "Tomates séchées"]
    },
    {
        "name": "Piquante",
        "price": 16.90,
        "is_available": True,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Chorizo", "Piments jalapeños", "Oignons"]
    },
    {
        "name": "Printanière",
        "price": 17.50,
        "is_available": False,
        "ingredient_names": ["Mozzarella", "Sauce tomate", "Épinards", "Fromage de chèvre", "Artichauts"]
    }
]


def create_test_data(session: Session):
    existing_pizzas = session.query(Pizza).first()
    if existing_pizzas:
        print("Données de test déjà présentes, pas de création")
        return
    
    ingredients = {}
    for ing_data in ingredients_data:
        ingredient_data = ing_data["ingredient"]
        ingredient = Ingredients(ingredient=ingredient_data)
        session.add(ingredient)
        ingredients[ingredient_data] = ingredient
    
    session.commit()
    
    for pizza_info in pizza_data:
        pizza = Pizza(
            name=pizza_info["name"],
            price=pizza_info["price"],
            is_available=pizza_info["is_available"],
            ingredients=[ingredients[name] for name in pizza_info["ingredient_names"]]
        )
        session.add(pizza)
    
    session.commit()
