import React from 'react'
import '../styles/App.css'
import Header from '../components/Header.jsx';
import Dashboard from '../pages/Dashboard.jsx'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx'
import Exam from '../pages/Exam.jsx'
import Passchange from '../pages/Passchange.jsx'
import Profile from '../pages/Profile.jsx'
import { Toaster } from 'react-hot-toast';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';



export const backend_URL = 'http://localhost:8000';
function App() {
  const { isAuthenticated } = useSelector((state) => state.root);


  return (

    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/changepassword' element={<Passchange />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>

  )
}

export default App