import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RecoverScreen } from '../components/auth/RecoverScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { VerifiedScreen } from '../components/auth/VerifiedScreen'

export const AuthRouter = () => {
    return (
        <div className='auth__container'>
            <Switch>
                <Route path='/auth/login' component={LoginScreen} />
                <Route path='/auth/register' component={RegisterScreen} />
                <Route path='/auth/recover' component={RecoverScreen} />
                <Route path='/auth/verified' component={VerifiedScreen} />

                <Redirect to='/auth/login' />
            </Switch>
        </div>
    )
}
