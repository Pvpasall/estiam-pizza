import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Commandes } from './pages/Commandes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Commandes/>}/>
    </Routes>
  )
}

export default App
