import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { AccountScreen } from '../components/account/AccountScreen'
import { BalanceScreen } from '../components/balance/BalanceScreen'
import { DashboardScreen } from '../components/dashboard/DashboardScreen'
import { Project } from '../components/projects/Project'
import { ProjectsScreen } from '../components/projects/ProjectsScreen'
import { TaskScreen } from '../components/tasks/TaskScreen'
import { Footer } from '../components/ui/Footer'
import { Header } from '../components/ui/Header'
import { Sidebar } from '../components/ui/Sidebar'

export const DashboradRouter = () => {

    const {open} = useSelector(state => state.ui);
    return (
        <div className="dashboard__container">
            <Header />
            <Sidebar />
            <div className={open ? 'main__container open' : 'main__container'}>
                <Switch>
                    <Route path='/projects' component={ProjectsScreen}  />
                    <Route exact path='/project/:projectID' component={Project} />
                    <Route exact path='/project/:projectID/task/:taskID' component={TaskScreen} />
                    <Route path='/payments-balance' component={BalanceScreen}  />
                    <Route path='/account' component={AccountScreen}  />
                    <Route exact path='/' component={DashboardScreen}  />

                    <Redirect to='/' />
                </Switch>
            </div>
            <Footer />
        </div>            
    )
}
