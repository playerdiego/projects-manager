import React from 'react'
import { Link } from 'react-router-dom'

export const LoginScreen = () => {
    return (
        <div className='auth__box'>
            <h1 className='auth__box-title'>Iniciar Sesión</h1>
            <form>
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Tu Email'
                />
                <input
                    type="password"
                    className="auth__input"
                    name="password"
                    placeholder='Tu Contraseña'
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Iniciar Sesión</button>

                <h3 className='auth__box-subtitle'>O Inicia Sesión con:</h3>

                <div className="auth__social-login">
                    <button className="btn google" type="button"><i className="fab fa-google"></i></button>
                    <button className="btn facebook" type="button"><i className="fab fa-facebook"></i></button>
                    <button className="btn twitter" type="button"><i className="fab fa-twitter"></i></button>
                </div>

                <Link className='auth__link' to='/auth/register'>¿No tienes una cuenta? Crea una aquí <i className="far fa-user"></i></Link>
                <Link className='auth__link' to='/auth/recover'>¿No recuerdas tu contraseña? Reestablécela aquí <i className="far fa-undo"></i></Link>
            </form>
        </div>
    )
}
