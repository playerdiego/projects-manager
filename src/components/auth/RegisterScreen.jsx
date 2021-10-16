import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <div className='auth__box'>
            <h1 className='auth__box-title'>Crear Nueva Cuenta</h1>
            <form>
                <input
                    type="text"
                    className="auth__input"
                    name="name"
                    placeholder='Tu Nombre'
                />
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
                <input
                    type="password"
                    className="auth__input"
                    name="password2"
                    placeholder='Repite tu Contraseña'
                />

                <button className='auth__login-button btn'><i className="far fa-user"></i> Crear Cuenta</button>

                <h3 className='auth__box-subtitle'>O Inicia Sesión con:</h3>

                <div className="auth__social-login">
                    <button className="btn google" type="button"><i className="fab fa-google"></i></button>
                    <button className="btn facebook" type="button"><i className="fab fa-facebook"></i></button>
                    <button className="btn twitter" type="button"><i className="fab fa-twitter"></i></button>
                </div>

                <Link className='auth__link' to='/auth/login'>¿Ya tienes una cuenta? Inicia Sesión aquí <i className="far fa-user"></i></Link>
            </form>
        </div>
    )
}
