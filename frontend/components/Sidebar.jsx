import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'

function Sidebar() {
  return (
    <>
      <div className="menu">
      <ul>
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/profile'}>Profile</Link></li>
          <li><Link to={'/exam'}>Exam</Link></li>
          <li><Link to={'/changepassword'}>Change Password</Link></li>
        </ul>
        <p><Link to={'/signout'}>Sign Out</Link></p>
     </div>
    </>
  )
}

export default Sidebar