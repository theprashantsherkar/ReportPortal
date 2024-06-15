import React, { useState } from 'react'
import '../styles/profile.css'
import Header from '../components/Header';

function Profile() {
  const [user, setUser] = useState('');
  //profile details display api goes here

  return (
    <>
      <Header />
      <div className="ProfileCont">
        <div className="profileHeading">
          <h1>
            <strong>
              {`${user || "Vivek"}'s Profile`}
            </strong>
          </h1>
          <div className="tableCont">
            <table className='table table-bordered' id='table2'>
              <tr className='table-row'>
                <th>First Name</th>
                <td>Vivek</td>
              </tr>
              <tr className='table-row'>
                <th>Last Name</th>
                <td>Sharma</td>
              </tr>
              <tr className='table-row'>
                <th>Email</th>
                <td>abc@gmail.com</td>
              </tr>
              <tr className='table-row'>
                <th>Contact no.</th>
                <td>xxx234782</td>
              </tr>
              <tr className='table-row'>
                <th>Reg. Date</th>
                <td>10/19/2024</td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    
    </>
  )
}

export default Profile