import React from 'react'
import './Navbar.css'
import imageLogo from '../assets/pizza.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
        <nav className="navbar">
            <div className='navbar--logo-holder'>
                <img src={imageLogo} width={60} height={40} alt='logo' className='navbar--logo' />
                <h1>PizzeriaFree</h1>
            </div>
            <ul className='navbar--link'>
                <li className='navbar--link-item'><Link to="/">Accueil</Link></li>
                <li className='navbar--link-item'><Link to="/menu">Menu</Link></li>
                <li className='navbar--link-item'><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar