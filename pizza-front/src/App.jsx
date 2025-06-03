import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menus from './pages/Menus'
import Contact from './pages/Contact'
import Paniers from './pages/Paniers'
import { useState } from 'react'
import AdminPage from './pages/Admin'


function App() {
     const [cart, setCart] = useState([]);
     const cartCount= cart.reduce((sum, item) => sum + item.quantity, 0);
     const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
     const location = useLocation();
     const hideNavbar = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');
  return (
       
       <>
            <Routes>
               {!hideNavbar && <Navbar cartCount={cartCount} />}
                <Route path="/" element={<Menus cart={cart} setCart={setCart} />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/panier" element={<Paniers cart={cart} handleRemove={handleRemove} />}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
       </>
  )
}

export default App
