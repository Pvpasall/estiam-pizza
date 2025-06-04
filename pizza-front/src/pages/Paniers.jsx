import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/panier.css'

function Paniers({cart, handleRemove}) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate();
  const handleValidate = () => {
    navigate('/formulaire');
  };

 return (
    <>
     <h1 className='panier'>Récapitulatif de mon panier</h1>
    <div className="cart-container">
      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image_url} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <span className="cart-item-name">{item.name}</span>
              <span>prix : <b>{item.price}</b></span><br />
              <span>Quantité : {item.quantity}</span>
              
            </div>
            <button
              className="cart-item-remove"
              onClick={() => handleRemove(item.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Résumé de la commande</h3>
        <div>Total : <strong>{total.toFixed(2)} €</strong></div>
        <button className="cart-validate" onClick={handleValidate}>Valider la commande</button>
        
      </div>
    </div>
</>
  );
}

export default Paniers