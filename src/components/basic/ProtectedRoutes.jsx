import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    let canActivate = null
    useEffect(() => {
        console.log(sessionStorage.getItem('loggedIn'));
        canActivate = sessionStorage.getItem('loggedIn')
    }, [])
    return (canActivate ? <Outlet /> : <Navigate to="/login" />)
}

export default ProtectedRoutes