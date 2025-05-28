import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Commandes } from './pages/Commandes'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {

  return (
    // <Routes>
    //   <Route path="/" element={<Commandes/>}/>
    // </Routes>
    <>
        <Navbar />
        <Home />
    </>
  )
}

export default App
