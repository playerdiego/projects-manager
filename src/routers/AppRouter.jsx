import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { login } from '../actions/authActions'
import { startLoadProjects } from '../actions/projectsActions'
import { ActionEmailScreen } from '../components/auth/ActionEmailScreen'
import { Loading } from '../components/ui/Loading'
import { AuthRouter } from './AuthRouter'
import { DashboradRouter } from './DashboradRouter'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'
import { Route, Routes } from 'react-router'


export const AppRouter = () => {

    const [cheking, setCheking] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified));

                dispatch(startLoadProjects(user.uid));

            } else {
            }
            setCheking(false);
        });

    }, [dispatch]);

    if(cheking) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Routes>


                <Route path='/auth/action' element={<ActionEmailScreen />} />

                <Route path='/auth/*' element={
                    <PublicRouter>
                        <AuthRouter />
                    </PublicRouter>
                } />

                <Route path='/*' element={
                    <PrivateRouter>
                        <DashboradRouter />
                    </PrivateRouter>
                } />

                
                {/* <Route path='/' element={ <Navigate to='/auth' /> } /> */}
            </Routes>
        </BrowserRouter>
    )
}
