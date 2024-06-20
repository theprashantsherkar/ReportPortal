import React, { useState, useContext, useEffect } from 'react'
import '../styles/profile.css'
import Header from '../components/Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import { LoginContext } from '../src/main';


function Profile() {
  const { user, isLoggedIn, loading } = useContext(LoginContext);
  // console.log('data been shown')
  // console.log(user);
  // console.log("code blown");
  console.log(isLoggedIn)


  //do this by context api instead.
  // useEffect(() => {
  //   async function onLoad() {
  //     try {
  //       const { data } = await axios.get(`${backend_URL}/admin/profile`, {
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //       })
  //       console.log(data)
  //       if (!data.success) {
  //         return toast.error('internal server error')
  //       }
  //       console.log(data.User.name);
  //       setUser(data.User.name)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   onLoad();
  // })


  return (
    <>
      <Header />
      <div className="ProfileCont">
        <div className="profileHeading">
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
                <td>{ user.name}</td>
              </tr>
              <tr className='table-row'>
                <th>Email</th>
                <td>{ user.email}</td>
              </tr>
              <tr className='table-row'>
                <th>Contact no.</th>
                <td>xxx234782</td>
              </tr>
              <tr className='table-row'>
                <th>Reg. Date</th>
                <td>{ user.createdAt}</td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    
    </>
  )
}

export default Profile