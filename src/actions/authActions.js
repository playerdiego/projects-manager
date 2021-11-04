import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "@firebase/auth";
import Swal from "sweetalert2";
import { githubAuthProvider, googleAuthProvider } from "../firesbase/firebase-config";
import { signInPopup } from "../helpers/signInPopup";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { cleanProjects } from "./projectsActions";

// Login

export const startLoginWithEmail = (email, password) => {
    return (dispatch) => {

        swalLoading('Iniciando Sesión', 'Por favor, espere');
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(({user}) => {
            dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified));
            Swal.close();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInPopup(dispatch, googleAuthProvider, false);
    }
};

export const startGithubLogin = () => {
    return (dispatch) => {
        signInPopup(dispatch, githubAuthProvider, true);
    }
}

// Register
export const startRegisterWithEmail = (name, email, password) => {
    return (dispatch) => {
        swalLoading('Creando Cuenta', 'Por favor, espere');
        const auth = getAuth();
        auth.languageCode = 'es';
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {

                await updateProfile(user, {
                    displayName: name
                })

                dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified));

                sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire('Se ha enviado el enlace de verificación', `Revisa tu correo ${user.email}`, 'success');
                });

                Swal.close();
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

// Logout
export const startLogout = () => {
    return (dispatch) => {
        
        swalLoading('Cerrando Sesión', 'Por favor, espere');

        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(logout());
            Swal.close();
            dispatch(cleanProjects());
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
}

// Normal Actions

export const login = (username, email, uid, photo, emailVerified) => ({
    type: types.login,
    payload: {username, email, uid, photo, emailVerified}
});

export const logout = () => ({
    type: types.logout
});