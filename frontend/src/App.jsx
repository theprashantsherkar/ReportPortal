
import React, { useContext, useEffect, useState } from 'react'
import '../styles/App.css'
import Dashboard from '../pages/Dashboard.jsx'
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
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
import Report from '../pages/Report.jsx';
import Dummy from '../pages/Dummy.jsx';
import AddSubs from '../pages/AddSubs.jsx';



export const backend_URL = 'http://localhost:8000';
function App() {

  const { setUser, user, setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    async function getUser() {
     try {
       const { data } = await axios.get(`${backend_URL}/admin/profile`, {
         headers: {
           "Content-Type": "application/json"
         },
         withCredentials: true,
       })
       setUser(data.User);
       setIsLoggedIn(true);
     } catch (error) {
       console.log('error in App.js');
     }
    }
    getUser();
  }, [Routes, Profile])

  return (

    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/evaluate' element={<Evaluation />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/exam' element={<Exam />} />
        <Route path='/changepassword' element={<Passchange />} />
        <Route path='/reports' element={<Report />} />
        <Route path='/report/dummy' element={<Dummy />} />
        <Route path='/assessment/:id' element={<Assessment />} />
        <Route path='/addSubjects' element={<AddSubs />} />
      </Routes>
      <Toaster />
    </Router>


  )
}

export default App


//todo: add subjects in a separate page?. optional, will take suggestions
// todo: make dashboard as the marks adding page
//will check and take suggestions
//todo: different format for different classes exams
//todo: add a search thing to the class teacher dropdown
//todo: there are some classes with just the grading system
//todo: add a back button in the existing demo app on the manage rubrics to go back
//todo: in subject of attendace the students arent showing
//todo: for such assessments where the it is purely grade based, hide percentage form reports. (depends what classes)