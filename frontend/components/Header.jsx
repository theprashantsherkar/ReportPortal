import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/header.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaUserAlt } from "react-icons/fa";
import { backend_URL } from '../src/App.jsx'
import { LoginContext } from '../src/main.jsx'

function Drop() {

    const { isLoggedIn, setIsLoggedIn, user } = useContext(LoginContext);
    
    const navigate = useNavigate()
    const logoutFunc = async () => {
        try {
            const { data } = await axios.get(`${backend_URL}/admin/logout`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (!data.success) {
                return toast.error('something went wrong');
            }
            toast.success(data.message)
            setIsLoggedIn(false);

        } catch (error) {
            console.log(error)
            toast.error('something went wrong');
            setIsLoggedIn(true);
        }
        navigate('/login')
    }

    return (
        <>
            <ul>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link to={'/changepassword'}>Change Password</Link></li>
                <li onClick={logoutFunc}>Log Out</li>
            </ul>
        </>
    )
}



function Header() {


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
                        <li><NavLink className='links' activeClassName="active" to={'/evaluate'} >Evaluate</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/reports'}>Reports</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/profile'}>Profile</NavLink></li>
                        <li><NavLink className='links' activeClassName="active" to={'/addSubjects'}>Add Subjects</NavLink></li>
                    </ul>
                </div>
                <div className="user" onClick={() => setView(!view)}>
                    <FaUserAlt />
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