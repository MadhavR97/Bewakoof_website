import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const token = localStorage.getItem('isAuth') || false

    return (
        <div>
            {token == 'true' ? children : <Navigate to="/login"></Navigate>}
        </div>
    )
}

export default PrivateRoute
