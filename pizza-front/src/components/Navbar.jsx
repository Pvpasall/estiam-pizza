import React from 'react'
import './Navbar.css'
import imageLogo from '../assets/pizza.png'
import { Link } from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'

function Navbar({cartCount}) {
  return (
    <header>
        <nav className="navbar">
            <div className='navbar--logo-holder'>
                {/* <img src={imageLogo} width={60} height={40} alt='logo' className='navbar--logo' /> */}
                <h1  className='titreDebut'><Link className='liens' to="/">PizzeriaFree</Link></h1>
            </div>
            <ul className='navbar--link'>
                {/* <li className='navbar--link-item'><Link className='nav' to="/">Accueil</Link></li> */}
                <li className='navbar--link-item'><Link className='nav' to="/">Menu</Link></li>
                <li className='navbar--link-item'><Link className='nav' to="/contact">Contact</Link></li>
                <li className='navbar--link-item'>
                    <Link className='nav cart-link' to="/panier" style={{position: "relative"}}>
                        <FaShoppingCart size={24} />
                        {cartCount > 0 && (<span className='cart-badge'>{cartCount}</span>)}
                    </Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar