import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({isAdmin, children }, props) => {
    const { loading, isAuthenticated, user} = useSelector(state => state.user)
    // console.log(isAuthenticated, user.role)

    // if(!loading ){
    //     console.log(props, user.role)
    //     if(isAuthenticated === true && user.role!=="admin")
    //         return <Navigate to="/account" />

    //     else if(isAuthenticated===false)
    //         return <Navigate to="/login" />

    //     return <> {children}</>
    // }
        return(
            <>
                {!loading && isAuthenticated===false ? <Navigate to="/login" />: children}
            
            </>
            
        )
}

export default ProtectedRoute