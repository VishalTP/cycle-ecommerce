import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated} = useSelector(state => state.user)

    return (
        <>
            {
                !loading && isAuthenticated ? children : <Navigate to="/login" />
            }
        </>
    )
}

export default ProtectedRoute