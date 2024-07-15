
import React, { useContext, useEffect, useState } from 'react'
import '../styles/App.css'
import Dashboard from '../pages/Dashboard.jsx'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Exam from '../pages/Exam.jsx'
import Passchange from '../pages/Passchange.jsx'
import Profile from '../pages/Profile.jsx'
import { Toaster } from 'react-hot-toast';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import axios from 'axios';
import { LoginContext } from './main.jsx';
import Assessment from '../pages/Assessment.jsx';
import Evaluation from '../pages/Evaluation.jsx';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';





export const backend_URL = 'http://localhost:8000';
function App() {

  const { setUser, user, setIsLoggedIn } = useContext(LoginContext);
  useEffect(() => {
    axios.get(`${backend_URL}/admin/profile`, {
      withCredentials: true,
    }).then((res) => {
      console.log("data is being set")
      setUser(res.data.User)
      console.log(res.data.User)
      setIsLoggedIn(true)
    }).catch((error) => {
      setUser({})
      console.log("error in App.js")
      console.log(error)
      setIsLoggedIn(false);
    })
  }, [Routes, Profile])

  return (


    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/evaluate' element={<Evaluation />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/exam' element={<Exam />} />
        <Route path='/changepassword' element={<Passchange />} />
        <Route path='/assessment/:id' element={<Assessment />} />

      </Routes>
      <Toaster />
    </Router>


  )
}

export default App
