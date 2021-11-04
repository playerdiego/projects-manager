import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export const VerifiedScreen = () => {

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.replace('/');
        }, 4000);
    }, [history])

    return (
        <div className='auth__box'>
            <h1 className='auth__box-title verified'>Se ha verificado la cuenta</h1>
            <p className='shadow-text verified'>Estás siendo redirigido a la aplicación...</p>
            <Link className='auth__link' to='/'>¿No fuiste redirigido? Volver a la aplicación manualmente</Link>
        </div>
    )
}
