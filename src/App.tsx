import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/Home' element ={<Home/>}/>
        <Route path='/Login' element ={<Login/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
