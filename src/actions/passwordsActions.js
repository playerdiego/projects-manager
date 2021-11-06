import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";
import CryptoJS from 'crypto-js';

const key = 'cosmos';

export const startLoadPasswords = (uid, projectID) => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const passwordsSnap = await getDocs(query(collection(db, uid, 'data', 'projects', projectID, 'passwords'), orderBy('date', 'desc')));
        const passwords = [];
        
        passwordsSnap.docs.forEach(snap => {
            passwords.push({
                ...snap.data(),
                password: CryptoJS.AES.decrypt(snap.data().password, key).toString(CryptoJS.enc.Utf8),
                id: snap.id
            });
        });

        dispatch(stopLoading());
        dispatch(loadPasswords(passwords));
    }
}

export const startAddPassword = (projectID, password) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta añadiendo la Contraseña', 'Por favor, espere');
        addDoc(collection(db, auth.currentUser.uid, 'data', 'projects', projectID, 'passwords'), password)
            .then(passwordRef => {
                Swal.fire(`Se ha Agregado la Contraseña`, '', 'success');
                Swal.close();
                
                const newPassword = {
                    ...password,
                    password: CryptoJS.AES.decrypt(password.password, key).toString(CryptoJS.enc.Utf8),
                    id: passwordRef.id
                }

                dispatch(addPassword(newPassword));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startUpdatePassword = (projectID, passwordID, password) => {
    return (dispatch) => {
        const auth = getAuth();
        updateDoc(doc(db, auth.currentUser.uid, 'data', 'projects', projectID, 'passwords', passwordID), password)
            .then(() => {
                dispatch(updatePass(passwordID, password));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startDeletePassword = (projectID, passwordID) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta eliminando la Contraseña', 'Por favor, espere');
        deleteDoc(doc(db, auth.currentUser.uid, 'data', 'projects', projectID, 'passwords', passwordID))
            .then(() => {
                dispatch(deletePassword(passwordID));
                Swal.fire('Se ha eliminado la Contraseña', '', 'success');
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startDeleteAllPasswords = (projectID) => {
    return async (dispatch) => {
        const auth = getAuth();
        const passwordsSnap = await getDocs(collection(db, auth.currentUser.uid, 'data', 'projects', projectID, 'passwords'));

        passwordsSnap.docs.forEach(snap => {
            deleteDoc(doc(db, auth.currentUser.uid, 'data', 'projects', projectID, 'passwords', snap.id))
                .catch(err => Swal.fire('Error', err.message, 'error'));
        });

        dispatch(cleanPasswords());
    }
}

export const loadPasswords = (passwords) => ({
    type: types.loadPasswords,
    payload: passwords
});

export const addPassword = (password) => ({
    type: types.addPassword,
    payload: password
});

export const updatePass = (passwordID, password) => ({
    type: types.updatePassword,
    payload: {
        passwordID,
        password
    }
});

export const deletePassword = (passwordID) => ({
    type: types.deletePassword,
    payload: passwordID
});

export const cleanPasswords = () => ({
    type: types.cleanPasswords
});