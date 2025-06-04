import { useEffect, useState } from "react";
import React from "react";
import "../css/menu.css";
function Menus({ cart, setCart }) {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${apiUrl}/pizzas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de chargment de données");
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
        const initialQuantities = {};
        data.forEach((pizza) => {
          initialQuantities[pizza.id] = 1;
        });
        setQuantities(initialQuantities);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleIncrease = (id) => {
    setQuantities((q) => ({ ...q, [id]: q[id] + 1 }));
  };
  const handleDecrease = (id) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(1, q[id] - 1) }));
  };

  const handleAddToCart = (pizza, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === pizza.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity }];
      }
    });
    alert(`${quantity}${pizza.name} ajoutée(s) au panier !`);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="pizza">
      <h1>Menu pizza</h1>
      <div className="pizza-container">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <img
              src={`/images/pizzas/${pizza.name}.jpeg`}
              alt={pizza.name}
              
            />
            <div className="pizza-info">
              <h3>{pizza.name}</h3>
              <p className="price">{pizza.price.toFixed(2)} €</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(pizza.id)}>-</button>
              <span style={{ margin: "0 10px" }}>{quantities[pizza.id]}</span>
              <button onClick={() => handleIncrease(pizza.id)}>+</button>
            </div>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(pizza, quantities[pizza.id])}
              style={{ marginTop: "10px" }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menus;
