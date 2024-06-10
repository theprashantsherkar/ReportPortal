import React, { useContext, useState } from 'react'
import '../styles/header.css'
import UserContext from '../context/userContext'
import userContextProvider from '../context/userContextProvider'
import axios from 'axios'


function Header () {
    const userData = axios.get(`${backendPath}/users/userData`).then((data) => {
        
    }).catch((err) => {
        
    })

    const {user, setUser} = useContext(UserContext)
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