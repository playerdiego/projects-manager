import { getAuth, signInWithPopup } from "@firebase/auth";
import Swal from "sweetalert2";
import { login } from "../actions/authActions";
import { swalLoading } from "./swalLoading";

export const signInPopup = (dispatch, provider) => {
    swalLoading('Iniciando Sesión', 'Por favor, espere');
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then(({user}) => {
            dispatch(login(user.displayName, user.email, user.uid, user.photoURL));
            Swal.close();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
}