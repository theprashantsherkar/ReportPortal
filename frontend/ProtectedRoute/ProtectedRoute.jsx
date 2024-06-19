import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

const navigate = useNavigate()
const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

const ProtectedRoute = ({ isLoggedIn, children }) => {

    if (!isLoggedIn) {
        return navigate('/login');
    }
    else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute;