import React, { useState } from 'react'
import '../styles/App.css'
import Dashboard from '../pages/Dashboard.jsx'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Exam from '../pages/Exam.jsx'
import Passchange from '../pages/Passchange.jsx'
import Profile from '../pages/Profile.jsx'
import { Toaster } from 'react-hot-toast';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import LoginContext from '../context/LoginContext.js';




export const backend_URL = 'http://localhost:8000';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (

    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/changepassword' element={<Passchange />} />
        </Routes>
        <Toaster />
      </Router>
    </LoginContext.Provider>

  )
}

export default App