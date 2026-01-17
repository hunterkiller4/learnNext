import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Travel from './pages/Travel'
import Food from './pages/Food'
import Toy from './pages/Toy'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/food" element={<Food />} />
      <Route path="/toy" element={<Toy />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App