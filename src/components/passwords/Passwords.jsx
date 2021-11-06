import React from 'react'
import { useSelector } from 'react-redux';
import { NewPassword } from './NewPassword';
import { PasswordBox } from './PasswordBox';

export const Passwords = ({passwords, projectID}) => {

    const {loading} = useSelector(state => state.ui)

    return (
        <>
            <hr />
            <h2 className='shadow-text main__subtitle'>Contraseñas</h2>

            <div className='passwords__container'>

                <NewPassword projectID={projectID} />

                {
                    passwords.length > 0 ?
                    passwords.map(pass => (
                        <PasswordBox key={pass.id} {...pass} projectID={projectID} />
                    ))
                    : loading ? (
                        <h4 className='shadow-text'>Cargando...</h4>
                    ) : (
                        <h4 className='shadow-text'>No tienes Contraseñas. ¡Crea una! :(</h4>
                    )
                }
            </div>
        </>
    )
}
