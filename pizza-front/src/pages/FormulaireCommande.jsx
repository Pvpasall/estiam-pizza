import React, { useState } from 'react';
import '../css/formulaire.css'; 

export default function FormulaireCommande() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Commande envoyée :", form);
    alert("Commande envoyée !");
  };

  return (
    <div className="formulaire-container">
      <h2>Finaliser la commande</h2>
      <form onSubmit={handleSubmit} className="formulaire-commande">
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
        <textarea name="adresse" placeholder="Adresse complète" value={form.adresse} onChange={handleChange} required />
        <button type="submit">Envoyer la commande</button>
      </form>
    </div>
  );
}
