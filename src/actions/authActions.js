import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "@firebase/auth";
import Swal from "sweetalert2";
import { githubAuthProvider, googleAuthProvider } from "../firesbase/firebase-config";
import { signInPopup } from "../helpers/signInPopup";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";

// Login

export const startLoginWithEmail = (email, password) => {
    return (dispatch) => {

        swalLoading('Iniciando Sesión', 'Por favor, espere');
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(({user}) => {
            dispatch(login(user.displayName, user.email, user.uid, user.photoURL));
            Swal.close();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInPopup(dispatch, googleAuthProvider);
    }
};

export const startGithubLogin = () => {
    return (dispatch) => {
        signInPopup(dispatch, githubAuthProvider);
    }
}

// Register
export const startRegisterWithEmail = (name, email, password) => {
    return (dispatch) => {
        swalLoading('Creando Cuenta', 'Por favor, espere');
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {

                await updateProfile(user, {
                    displayName: name
                })

                const {displayName, email, uid, photoURL} = user;
                dispatch(login(displayName, email, uid, photoURL));
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
            dispatch(logout);
            Swal.close();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
}

// Normal Actions

export const login = (username, email, uid, photo) => ({
    type: types.login,
    payload: {username, email, uid, photo}
});

export const logout = () => ({
    type: types.logout
});