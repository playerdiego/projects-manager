import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { DashboradRouter } from './DashboradRouter'

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path='/auth' component={AuthRouter}/>

                <Route path='/' component={DashboradRouter}  />

                <Redirect to='/' />
            </Switch>
        </Router>
    )
}
