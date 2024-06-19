import React, { useState } from 'react'
import '../styles/passchange.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../components/Header'
import { backend_URL } from '../src/App';

function Passchange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  //change password api integration
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`${backend_URL}/admin/changepass`, {
      oldPassword,
      newPassword,
      confPassword,
    },
      {
        headers: {
        "Content-Type":"application/json"
        },
        withCredentials: true,
      })
    console.log(data)
    if (!data || !data.success) {
      return toast.error(data.message);
    }
    toast.success(data.message);
  }

  return (
    <>
      <Header/>
      <div className="changepass">
        <div className="pass_inputs">
          <form action="/changepass" method='PUT' onSubmit={submitHandler}>

            <label htmlFor="inputPassword5" className="form-label w-100">Enter Old password</label>
            <input
              type="password"
              name='oldPassword'
              id="inputPassword5"
              className="form-control w-100"
              aria-describedby="passwordHelpBlock"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label htmlFor="inputPassword6" className="form-label w-100">Enter new password</label>
            <input
              type="password"
              name='newPassword'
              id="inputPassword6"
              className="form-control w-100"
              aria-describedby="passwordHelpBlock"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="inputPassword7" className="form-label w-100">Re-enter new  password</label>
            <input
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              name='confPassword'
              id="inputPassword7"
              className="form-control"
              aria-describedby="passwordHelpBlock"
            />
            <button type="submit" className='btn btn-primary'>Confirm</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Passchange