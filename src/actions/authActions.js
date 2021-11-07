import { createUserWithEmailAndPassword, deleteUser, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "@firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Swal from "sweetalert2";
import { db, githubAuthProvider, googleAuthProvider, storage } from "../firesbase/firebase-config";
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

// Updates

export const startUpdateProfile = (user, setter) => {
    return (dispatch) => {

        swalLoading('Actualizando Perfil', 'Por favor, espere');

        const auth = getAuth();

        updateProfile(auth.currentUser, user)
            .then(() => {
                dispatch(updateProfileInfo(user));
                Swal.close();
                Swal.fire('Se ha actualizado el nombre de usuario', '', 'success');
                setter(false);
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startUpdateEmail = (email, setter, setReAuth) => {
    return (disptach) => {
        swalLoading('Actualizando Email', 'Por favor, espere');
        const auth = getAuth();

        updateEmail(auth.currentUser, email)
            .then(() => {
                disptach(updateProfileInfo({email}));
                Swal.close();
                setter(false);
                setReAuth({status: false, action: null});
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire('Se ha enviado el enlace de verificación', `Revisa tu correo ${email}`, 'success');
                });
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
                setReAuth({status: false, action: null});
            })
    }
}

export const startUpdatePhoto = (file, setter) => {
    return async (dispatch) => {
        
        const auth = getAuth();

        swalLoading('Actualizando Foto de Perfil', 'Por favor, espere');
        const imageRef = ref(storage, 'profilePictures/' + auth.currentUser.displayName);

        const snapshot = await uploadBytesResumable(imageRef, file);
        const photoURL = await getDownloadURL(snapshot.ref);



        dispatch(updateProfileInfo({photoURL}))
        updateProfile(auth.currentUser, {photoURL})
            .then(() => {
                dispatch(updateProfileInfo({photoURL}));
                Swal.close();
                Swal.fire('Se ha actualizado la Foto de Perfil', '', 'success');
                setter(false);
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startUpdatePassword = (password, setter) => {
    return () => {
        const auth = getAuth();
        swalLoading('Actualizando Contraseña', 'Por favor, espere');
        updatePassword(auth.currentUser, password)
            .then(() => {
                Swal.close();
                Swal.fire('Se ha actualizado la contraseña', '', 'success');
                setter(false);
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startDeleteAccount = () => {
    return async (dispatch) => {
        swalLoading('Eliminando Cuenta', 'Por favor, espere');

        const auth = getAuth();

        const projectsSnap = await getDocs(collection(db, auth.currentUser.uid, 'data', 'projects'));
        
        projectsSnap.docs.forEach(snap => {
            deleteDoc(doc(db, auth.currentUser.uid, 'data', 'projects', snap.id))
                .catch(err => Swal.fire('Error', err.message, 'error'));
        });

        deleteUser(auth.currentUser)
            .then(() => {
                dispatch(logout());
                dispatch(cleanProjects());


                Swal.close();
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

// Normal Actions

export const login = (displayName, email, uid, photoURL, emailVerified) => ({
    type: types.login,
    payload: {displayName, email, uid, photoURL, emailVerified}
});

export const logout = () => ({
    type: types.logout
});

export const updateProfileInfo = (user) => ({
    type: types.updateProfile,
    payload: user
});