import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import { LoginContext } from '../src/main';


const navigate = useNavigate()

// const { isLoggedIn } = useContext(LoginContext);
const ProtectedRoute = ({ isLoggedIn, children }) => {

    if (!isLoggedIn) {
        return navigate('/login');
    }
    else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute;