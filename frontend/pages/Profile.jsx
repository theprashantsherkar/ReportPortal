import React, { useState, useContext, useEffect } from 'react'
import '../styles/profile.css'
import Header from '../components/Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import LoginContext from '../context/LoginContext.js';

function Profile() {
  const [user, setUser] = useState("")

  // const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(LoginContext)

  //do this by context api instead.
  useEffect(() => {
    async function onLoad() {
      try {
        const { data } = await axios.get(`${backend_URL}/admin/profile`, {
          headers: {
            "Content-Type": "application/json"
          },
        })
        console.log(data)
        if (!data.success) {
          return toast.error('internal server error')
        }
        console.log(data.User.name);
        setUser(data.User.name)
      } catch (error) {
        console.log(error)
      }
    }
    onLoad();
  })



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