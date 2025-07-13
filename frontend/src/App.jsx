import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Quiz from './components/Quiz'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/quiz" element={<Quiz/>} />
        
      </Routes>

    </Router>
    
  )
}

export default App
