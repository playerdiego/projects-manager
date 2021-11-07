import React from 'react';
import queryString from 'query-string';
import { ResetPassword } from './ResetPassword';
import { RecoverEmail } from './RecoverEmail';
import { VerifiyScreen } from './VerifyScreen';
import { Redirect } from 'react-router';

export const ActionEmailScreen = ({location}) => {
    
    const params = queryString.parse( location.search );

    if(!params.mode) {
        return <Redirect to='/' />
    }
    
    return (
        
        params.mode === 'verifyEmail' ? <VerifiyScreen code={params.oobCode} />
        : params.mode === 'resetPassword' ? <ResetPassword code={params.oobCode} />
        : params.mode === 'recoverEmail' && <RecoverEmail code={params.oobCode} />

        

    )
}
