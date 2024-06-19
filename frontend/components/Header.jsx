import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/header.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaUserAlt } from "react-icons/fa";
import { backend_URL } from '../src/App'

function Drop() {
    const navigate = useNavigate()
    const logoutFunc = async() => {
        try {
            const { data } = await axios.get(`${backend_URL}/admin/logout`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!data.success) {
                return toast.error('something went wrong');
            }
            toast.success(data.message)

        } catch (error) {
            console.log(error)
            toast.error('something went wrong');
        }
        navigate('/login')
    }

    return (
        <>
        <ul>
            <li><Link to={'/profile'}>Profile</Link></li>
            <li onClick={logoutFunc}>Log Out</li>
        </ul>
        </>
    )
}



function Header() {
    // const userData = axios.get(`${backend_URL}/users/userData`).then((data) => {

    // }).catch((err) => {

    // })



    const [user, setUser] = useState("")
    const [view, setView] = useState(false)
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
                        <li><NavLink className='links' activeClassName="active" to={'/dashboard'}>Dashboard</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/exam'} >Exam</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/profile'}>Profile</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/changepassword'}>Change Password</NavLink></li>
                    </ul>
                </div>
                <div className="user" onClick={() => setView(!view)}>
                    <FaUserAlt  />
                    {view ? (<div className="drop">
                        <Drop />
                    </div>) : (<>
                    </>)}
                </div>
            </div>
        </>
    )
}



export default Header