import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Formulaire.css'; 
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function FormulaireCommande({handleClearCart}) {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async  (e) => {
      e.preventDefault();
      const commande = {
      client: {
        nom: form.nom,
        email: form.email,
        phone: form.telephone,
        address: form.adresse
      },
      items: cart.map(item => ({
        pizza_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      })),
      delivery_address: form.adresse
  };

    try{
      const response = await fetch(`${apiUrl}/orders/`,{
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commande),
      });
        if(!response.ok){
          throw new Error("Erreur lors de l'envoi de la commande");
        }
        console.log("Commande envoyée :", commande);
        alert("Commande envoyée !");
        handleClearCart();
      navigate('/');
    }catch(error){
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="formulaire-container">
      <h2>Finaliser la commande</h2>
      
      <form onSubmit={handleSubmit} className="formulaire-commande">
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
        <textarea name="adresse" placeholder="Adresse complète" value={form.adresse} onChange={handleChange} required />
        <button className='valider' type="submit">Envoyer la commande</button>
      </form>
    </div>
  );
}
