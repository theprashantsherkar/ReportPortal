import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

import axios from 'axios'
import { FaUserAlt } from "react-icons/fa";
import { backend_URL } from '../src/App'


function Header() {
    // const userData = axios.get(`${backend_URL}/users/userData`).then((data) => {

    // }).catch((err) => {

    // })

    const [user, setUser] = useState("")
    return (
        <>
            <div className="headingCont">
                <div className="heading">
                    <Link to={'/'}>
                        <h1>
                            Report Card System.
                        </h1>
                    </Link>
                </div>
                <div className="navs">
                    <ul>
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/exam'} >Exam</Link></li>
                        <li><Link to={'/profile'}>Profile</Link></li>
                        <li><Link to={'/changepassword'}>Change Password</Link></li>
                    </ul>
                </div>
                <div className="user">
                    <FaUserAlt />
                </div>
            </div>
        </>
    )
}



export default Header