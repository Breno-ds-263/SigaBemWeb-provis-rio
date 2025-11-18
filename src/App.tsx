import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Notification from './pages/Notification'

function App() {
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
