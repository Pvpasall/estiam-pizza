import React from 'react'
import { Link } from 'react-scroll'
import './Navbar.css'
import imageLogo from '../assets/pizza.png'

function Navbar() {
  return (
    <header>
        <nav className="navbar">
            <div className='navbar--logo-holder'>
                <img src={imageLogo} width={60} height={40} alt='logo' className='navbar--logo' />
                <h1>PizzeriaFree</h1>
            </div>
            <ul className='navbar--link'>
                <li className='navbar--link-item'>Accueil</li>
                <li className='navbar--link-item'>Menu</li>
                <li className='navbar--link-item'>Contact</li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar