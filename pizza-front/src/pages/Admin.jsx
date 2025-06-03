import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import '../css/admin.css'
import usePizzas from '../hooks/use-pizza';

const AdminPage = () => {
  const { pizzas, loading, error, addPizza, updatePizza, deletePizza } = usePizzas();

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    is_available: true
  });

  const handleAdd = async () => {
    if (formData.name.trim()) {
      try {
        await addPizza({
          name: formData.name,
          price: parseFloat(formData.price) || 0,
          is_available: formData.is_available
        });
        setFormData({ name: '', price: 0, is_available: true });
        setShowAddForm(false);
      } catch (err) {
        console.error("Erreur lors de l'ajout:", err);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      is_available: item.is_available
    });
  };

  const handleUpdate = async () => {
    if (formData.name.trim()) {
      try {
        await updatePizza(editingId, {
          name: formData.name,
          price: parseFloat(formData.price) || 0,
          is_available: formData.is_available
        });
        setEditingId(null);
        setFormData({ name: '', price: 0, is_available: true });
      } catch (err) {
        console.error("Erreur lors de la modification", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deletePizza(id);
      } catch (err) {
        console.error('Failed to delete pizza:', err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', price: 0, is_available: true });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="panel">
          <div className="empty-state">
            <p>Chragements des pizzas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="panel">
          <div className="empty-state">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="panel">
        <div className="header">
          <h1 className="title">Pizza Admin Dashboard</h1>
          <div className="button-group">
            <button
              className="button button-primary"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={20} />
              Ajouter un Pizza
            </button>
          </div>
        </div>

        {(showAddForm || editingId) && (
          <div className="form-section">
            <div className="form-grid">
              <div className="form-group">
                    <label className="label">Nom</label>
                    <select
                        className="select"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    >
                        <option value="">Sélectionnez une pizza</option>
                        <option value="Margherita">Margherita</option>
                        <option value="Regina">Regina</option>
                        <option value="Quatre Saisons">Quatre Saisons</option>
                        <option value="Hawai">Hawai</option>
                        <option value="Végétarienne">Végétarienne</option>
                        <option value="Carnivore">Carnivore</option>
                        <option value="Méditerranéenne">Méditerranéenne</option>
                        <option value="Sicilienne">Sicilienne</option>
                        <option value="Forestière">Forestière</option>
                        <option value="Calzone">Calzone</option>
                        <option value="Spéciale du Chef">Spéciale du Chef</option>
                        <option value="Piquante">Piquante</option>
                        <option value="Printanière">Printanière</option>
                    </select>
                </div>
              <div className="form-group">
                <label className="label">Prix</label>
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label className="label">Disponibilité</label>
                <select
                  className="select"
                  value={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.value === 'true' })}
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>
              <div className="form-group">
                <div className="button-group">
                  <button
                    className="button button-success"
                    onClick={editingId ? handleUpdate : handleAdd}
                  >
                    <Save size={16} />
                    {editingId ? 'Modifier' : 'Enregistrer'}
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={handleCancel}
                  >
                    <X size={16} />
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {pizzas.length === 0 ? (
          <div className="empty-state">
            <p>No pizzas found. Click "Add Pizza" to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Nom</th>
                  <th className="th">Prix</th>
                  <th className="th">Disponibilité</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pizzas.map((pizza) => (
                  <tr
                    key={pizza.id}
                    className="table-row"
                  >
                    <td className="td">
                      <code className="id-code">{pizza.id.toString().substring(0, 8)}...</code>
                    </td>
                    <td className="td">{pizza.name}</td>
                    <td className="td">{pizza.price.toFixed(2)} €</td>
                    <td className="td">
                      <span className={`status-badge ${pizza.is_available ? 'status-available' : 'status-unavailable'}`}>
                        {pizza.is_available ? 'Disponible' : 'Non Disponible'}
                      </span>
                    </td>
                    <td className="td">
                      <div className="button-group">
                        <button
                          className="button button-warning button-small"
                          onClick={() => handleEdit(pizza)}
                        >
                          <Edit3 size={14} />
                          Modifier
                        </button>
                        <button
                          className="button button-danger button-small"
                          onClick={() => handleDelete(pizza.id)}
                        >
                          <Trash2 size={14} />
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;