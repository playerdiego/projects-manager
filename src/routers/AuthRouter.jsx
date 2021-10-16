import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RecoverScreen } from '../components/auth/RecoverScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className='auth__container'>
            <Switch>
                <Route path='/auth/login' component={LoginScreen} />
                <Route path='/auth/register' component={RegisterScreen} />
                <Route path='/auth/recover' component={RecoverScreen} />

                <Redirect to='/auth/login' />
            </Switch>
        </div>
    )
}
