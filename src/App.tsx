import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Notification from './pages/Notification'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/Home' element ={<Home></Home>}/>
        <Route path='/Notification' element ={<Notification></Notification>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
