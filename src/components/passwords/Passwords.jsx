import React, { useState } from 'react'
import { passwords } from '../../data/passwords';
import { NewPassword } from './NewPassword';
import { PasswordBox } from './PasswordBox';

export const Passwords = () => {
    return (
        <>
            <hr />
            <h2 className='shadow-text main__subtitle'>Contraseñas</h2>

            <div className='passwords__container'>

                <NewPassword />

                {
                    passwords.length > 0 &&
                    passwords.map(pass => (
                        <PasswordBox key={pass.id} {...pass} />
                    ))
                }
            </div>
        </>
    )
}
