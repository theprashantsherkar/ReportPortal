import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';


const navigate = useNavigate()


const ProtectedRoute = ({ isLoggedIn, children }) => {

    if (!isLoggedIn) {
        return navigate('/login');
    }
    else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute;