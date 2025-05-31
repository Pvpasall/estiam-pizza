import React from 'react'
import '../css/panier.css'

function Paniers({cart}) {
  return (
    <div className='panier'>
        <h2>Mon panier</h2>
        {cart.length===0 ?(
            <p>Panier vide</p>
        ):(
            <ul>
                {cart.map(item =>(
                    <li key={item.id}>
                        {item.name} - Quantité : {item.quantity}
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Paniers