import { useState, useEffect } from 'react';

const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/pizzas` || 'http://localhost:8000'

/**
 * @typedef {Object} Pizza
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {boolean} is_available
 */
const usePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${apiUrl}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pizzas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, [apiUrl]);

  const addPizza = async (newPizza) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPizza),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdPizza = await response.json();
      setPizzas(prev => [...prev, createdPizza]);
      return createdPizza;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePizza = async (id, updatedPizza) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPizza),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();
      setPizzas(prev => prev.map(pizza => pizza.id === id ? updated : pizza));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePizza = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPizzas(prev => prev.filter(pizza => pizza.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    pizzas,
    loading,
    error,
    addPizza,
    updatePizza,
    deletePizza,
  };
};

export default usePizzas;