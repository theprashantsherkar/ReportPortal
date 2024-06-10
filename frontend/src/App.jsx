import React from 'react'
import '../styles/App.css'
import Header from '../components/Header.jsx';
import Dashboard from '../pages/Dashboard.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx'
import Exam from '../pages/Exam.jsx'
import Passchange from '../pages/Passchange.jsx'
import Profile from '../pages/Profile.jsx'


function App() {
  return (
    <>
        <div className="layout">
          <div className="header">
            <Header />
          </div>
          <BrowserRouter>
            <div className="mainDiv">
              <div className="sidebar">
                <Sidebar />
              </div>
              <div className='w-75'>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/exam' element={<Exam />} />
                  <Route path='/changepassword' element={<Passchange />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </div>

    </>
  )
}

export default App