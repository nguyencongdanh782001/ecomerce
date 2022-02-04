import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const AuthRoute = ({ children }) => {
    const { currentUser, isLoading, error } = useSelector(state => state.user)
    const { currentAuthUser } = useSelector((state) => state.auth);

    return (
        <>
            {isLoading ? (<Loading />) : (currentUser && error === '') || currentAuthUser?._id ? <Navigate to='/' /> : children}
        </>
    )
}

export default AuthRoute
