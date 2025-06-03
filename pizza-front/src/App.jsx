import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Navbar from './components/Navbar'
//import Home from './pages/Home'
import Menus from './pages/Menus'
import Contact from './pages/Contact'
import Paniers from './pages/Paniers'
import FormulaireCommande from './pages/FormulaireCommande';
import { useState } from 'react'


function App() {
     const [cart, setCart] = useState([]);
     const cartCount= cart.reduce((sum, item) => sum + item.quantity, 0);
     const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  return (
       
       <>
       <Navbar cartCount ={cartCount} />
            
            <Routes>
                {/* <Route path="/" element={<Home />}/> */}
                <Route path="/" element={<Menus cart={cart} setCart={setCart} />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/panier" element={<Paniers cart={cart} handleRemove={handleRemove} />}/>
                <Route path="/formulaire" element={<FormulaireCommande />} />
            </Routes>


       </>
  )
}

export default App
