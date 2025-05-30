import { useEffect, useState } from 'react';
import React from 'react'
import '../css/menu.css'
function Menus() {

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(()=>{
    fetch('menu.json')
        .then(response => {
            if(!response.ok){
                throw new Error('Erreur de chargment de données')
            }
            return response.json()
        })
        .then(data=>{
            setPizzas(data);
            setLoading(false);
        })
        .catch(err=>{
            setError(err.message);
            setLoading(false)
        });
  }, []);

  if(loading) return <div className='loading'>Chargement...</div>
  if(error) return <div className='error'>Erreur: {error}</div>


  return (
    <div className='pizza'>
        <h1>Menu pizza</h1>
        <div className='pizza-container'>
            {pizzas.map(pizza=>(
                <div key={pizza.id} className='pizza-card'>
                    <img
                        src={pizza.image_url}
                        alt={pizza.name}
                        onError={(e)=>{
                            e.target.onError = null;
                            e.target.src ='https://via.placeholder.com/300x200?text=Image+Non+Disponible'
                        }}
                    />
                    <div className='pizza-info'>
                        <h3>{pizza.name}</h3>
                        <p className='price'>{pizza.price.toFixed(2)} €</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
  
}

export default Menus