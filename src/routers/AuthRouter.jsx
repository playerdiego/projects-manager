import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RecoverScreen } from '../components/auth/RecoverScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className='auth__container'>
            <Routes>
                <Route path='*' element={<Navigate to='/auth/login' />} />

                <Route path='/login' element={<LoginScreen/>} />
                <Route path='/register' element={<RegisterScreen/>} />
                <Route path='/recover' element={<RecoverScreen/>} />

            </Routes>
        </div>
    )
}
