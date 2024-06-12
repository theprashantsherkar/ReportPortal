import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
    <App />
  </React.StrictMode>,
)
