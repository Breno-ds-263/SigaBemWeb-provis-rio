import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import Notification from './pages/Notification.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Home />
    <Notification />

  
  </StrictMode>,
)
