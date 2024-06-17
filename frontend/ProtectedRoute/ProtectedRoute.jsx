import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import LoginContext from '../context/LoginContext';


const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

const ProtectedRoute = ({ isLoggedIn, children }) => {

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute