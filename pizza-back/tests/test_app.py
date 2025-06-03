from unittest.mock import Mock
from decimal import Decimal
from app.routers.order import create_order 
from app.routers.pizza import list_pizzas
mock_session = Mock()
mock_session.add = Mock()
mock_session.commit = Mock()
mock_session.refresh = Mock(side_effect=lambda obj: setattr(obj, 'id', 1))

def test_create_order():
    order_data = Mock()
    order_data.client.email = "test@example.com"
    order_data.client.nom = "test user"
    order_data.client.phone = "123456789"
    order_data.client.address = "12 Bd de la Republic"
    order_data.delivery_address = "45 avenue delivery"
    order_data.items = [
        Mock(quantity=2, unit_price=Decimal("10.00"), pizza_id=1),
        Mock(quantity=1, unit_price=Decimal("15.00"), pizza_id=2)
    ]
    
    result = create_order(order_data, mock_session)
    
    assert result["message"] == "Commande créée"
    assert "order_id" in result

from unittest.mock import Mock

def test_list_pizzas():
    
    pizza1 = Mock()
    pizza1.id = 1
    pizza1.name = "Margherita"
    pizza1.price = 12.50
    
    pizza2 = Mock()
    pizza2.id = 2
    pizza2.name = "Pepperoni"
    pizza2.price = 15.00
    
    mock_session.exec.return_value.all.return_value = [pizza1, pizza2]
    result = list_pizzas(mock_session)
    
    assert len(result) == 2
    assert result[0].name == "Margherita"
    assert result[1].name == "Pepperoni"