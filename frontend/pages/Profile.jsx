import React, { useState, useContext, useEffect } from 'react'
import '../styles/profile.css'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../src/main';


function Profile() {
  const navigate = useNavigate();
  const { user, isLoggedIn, loading } = useContext(LoginContext);
  

  console.log(user);


  return (
    <>
      <Header />
      <div className="ProfileCont">
        {user && <div className="profileHeading">
          <h1>
            <strong>
              {`${user.name || "Vivek"}'s Profile`}
            </strong>
          </h1>
          <div className="tableCont">
            <table className='table table-bordered' id='table2'>
              <tr className='table-row'>
                <th>First Name</th>
                <td>{user.name}</td>
              </tr>
              <tr className='table-row'>
                <th>Last Name</th>
                <td>{user.name}</td>
              </tr>
              <tr className='table-row'>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr className='table-row'>
                <th>Contact no.</th>
                <td>xxx234782</td>
              </tr>
              <tr className='table-row'>
                <th>Reg. Date</th>
                <td>{user.createdAt}</td>
              </tr>
            </table>
          </div>

        </div>}
      </div>

    </>
  )
}

export default Profile