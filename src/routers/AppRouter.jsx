import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { login } from '../actions/authActions'
import { startLoadProjects } from '../actions/projectsActions'
import { ActionEmailScreen } from '../components/auth/ActionEmailScreen'
import { Loading } from '../components/ui/Loading'
import { AuthRouter } from './AuthRouter'
import { DashboradRouter } from './DashboradRouter'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'
import { Route } from 'react-router'


export const AppRouter = () => {

    const [cheking, setCheking] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified));
                setIsAuth(true);

                dispatch(startLoadProjects(user.uid));

            } else {
                setIsAuth(false);
            }
            setCheking(false);
        });

    }, [dispatch]);

    if(cheking) {
        return <Loading />
    }

    return (
        <Router>
            <Switch>


                <Route exact path='/auth/action' component={ActionEmailScreen} />
                <PublicRouter path='/auth' component={AuthRouter} isAuth={isAuth} />


                <PrivateRouter path='/' component={DashboradRouter} isAuth={isAuth} />


                <Redirect to='/auth' />
            </Switch>
        </Router>
    )
}
