import React from 'react'
import { useDispatch } from 'react-redux'
import { startGithubLogin, startGoogleLogin } from '../../actions/authActions';

export const SocialAuth = () => {

    const dispatch = useDispatch();

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const handleGithubLogin = () => {
        dispatch(startGithubLogin());
    }

    return (
        <div className="auth__social-login">

            <button className="btn google" type="button" onClick={handleGoogleLogin}>
                <i className="fab fa-google"></i>
            </button>

            <button className="btn github" type="button" onClick={handleGithubLogin}>
                <i className="fab fa-github"></i>
            </button>

        </div>
    )
}
