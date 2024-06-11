import React, { useContext, useState } from 'react'
import '../styles/header.css'
import UserContext from '../context/userContext'
import userContextProvider from '../context/userContextProvider'
import axios from 'axios'
import { backend_URL } from '../src/App'


function Header () {
    const userData = axios.get(`${backend_URL}/users/userData`).then((data) => {

    }).catch((err) => {

    })

   const [user, setUser] = useState("")
    return (
        <>
            <div className="headingCont">
                <div className="content">
                    <div className="heading">
                        <h1>
                            Report Card System.
                        </h1>
                        <h4>
                             {user || 'vivek kumar'}
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Header