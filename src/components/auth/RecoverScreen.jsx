import React from 'react'
import { Link } from 'react-router-dom'

export const RecoverScreen = () => {
    return (
        <div className='auth__box'>
            <Link className="btn btn-less-deep auth__button-back" to='/auth/login'><i className="fas fa-arrow-left"></i></Link>
            <h1 className='auth__box-title'>Recupera tu Cuenta</h1>
            <form>
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Tu Email'
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Recuperar Contraseña</button>
            </form>
        </div>
    )
}
