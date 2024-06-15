import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAuthenticated, children }) => {

    if (!isAuthenticated) {
        return <Navigate to={'/login'}/>
    }
    else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute