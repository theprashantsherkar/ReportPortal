import React from 'react'
import '../styles/passchange.css'

function Passchange() {
  //change password api integration
  return (
    <>
      <div className="changepass">
        <div className="inputs">
          <label for="inputPassword5" className="form-label w-100">Enter Old password</label>
          <input type="password" id="inputPassword5" className="form-control w-100" aria-describedby="passwordHelpBlock" />
          <label for="inputPassword6" className="form-label w-100">Enter new password</label>
          <input type="password" id="inputPassword6" className="form-control w-100" aria-describedby="passwordHelpBlock" />
          <label for="inputPassword7" className="form-label w-100">Re-enter new  password</label>
          <input type="password" id="inputPassword7" className="form-control" aria-describedby="passwordHelpBlock" />
          <button type="submit" className='btn btn-primary'>Confirm</button>
        </div>
      </div>

    </>
  )
}

export default Passchange