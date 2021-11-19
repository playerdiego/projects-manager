import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
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
                <Routes>
                    <Route path='*' element={<Navigate to='/' />} />

                    <Route path='/projects' element={<ProjectsScreen/>}  />
                    <Route end path='/project/:projectID' element={<Project/>} />
                    <Route end path='/project/:projectID/task/:taskID' element={<TaskScreen/>} />
                    <Route path='/payments-balance' element={<BalanceScreen />}  />
                    <Route path='/account' element={<AccountScreen/>}  />
                    <Route end path='/' element={<DashboardScreen/>}  />

                </Routes>
            </div>
            <Footer />
        </div>            
    )
}
