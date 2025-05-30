import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menus from './pages/Menus'
import Contact from './pages/Contact'


function App() {

  return (
       
       <>
       <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/menu" element={<Menus />}/>
                <Route path="/contact" element={<Contact />}/>
            </Routes>


       </>
  )
}

export default App
