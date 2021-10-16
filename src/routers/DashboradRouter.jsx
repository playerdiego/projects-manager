import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { BalanceScreen } from '../components/balance/BalanceScreen'
import { DashboardScreen } from '../components/dashboard/DashboardScreen'
import { ProjectsScreen } from '../components/projects/ProjectsScreen'
import { Header } from '../components/ui/Header'
import { Sidebar } from '../components/ui/Sidebar'

export const DashboradRouter = () => {

    const {open} = useSelector(state => state.ui)

    return (
        <div className="dashboard__container">
            <Header />
            <Sidebar />
            <div className={open ? 'main__container open' : 'main__container'}>
                <Switch>
                    <Route path='/projects' component={ProjectsScreen}  />
                    <Route path='/payments-balance' component={BalanceScreen}  />
                    <Route exact path='/' component={DashboardScreen}  />

                    <Redirect to='/' />
                </Switch>
            </div>
        </div>            
    )
}
