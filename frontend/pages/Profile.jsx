import React, { useState } from 'react'
import '../styles/profile.css'

function Profile() {
  const [user, setUser] = useState('');
  //profile details display api goes here

  return (
    <>
      <div className="ProfileCont">
        <div className="profileHeading">
          <h1>
            <strong>
              {`${user || "Vivek"}'s Profile`}
            </strong>
          </h1>
          <div className="tableCont">
            <table className='table table-bordered'>
              <tr>
                <th>First Name</th>
                <td>Vivek</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>Sharma</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>abc@gmail.com</td>
              </tr>
              <tr>
                <th>Contact no.</th>
                <td>xxx234782</td>
              </tr>
              <tr>
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