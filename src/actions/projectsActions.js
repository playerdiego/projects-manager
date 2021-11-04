import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";

export const startLoadProjects = (uid) => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const projectsSnap = await getDocs(collection(db, uid));
        const projects = [];
        
        projectsSnap.docs.forEach(snap => {
            projects.push({
                ...snap.data(),
                id: snap.id
            });
        });
        
        dispatch(stopLoading());
        dispatch(loadProjects(projects));
    }
}

export const startAddProject = (project) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta añadiendo el Proyecto', 'Por favor, espere');
        addDoc(collection(db, auth.currentUser.uid), project)
            .then(projectRef => {
                Swal.fire(`Se ha Agregado el proyecto`, '', 'success');
                Swal.close();
                const createdProject = {
                    ...project,
                    id: projectRef.id
                }
                dispatch(addProject(createdProject));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startDeleteProject = (projectID) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta eliminando el Proyecto', 'Por favor, espere');
        deleteDoc(doc(db, auth.currentUser.uid, projectID))
            .then(() => {
                dispatch(deleteProject(projectID));
                Swal.fire('Se ha eliminado el proyecto', '', 'success');
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const loadProjects = (projects) => ({
    type: types.loadProjects,
    payload: projects
});

export const addProject = (project) => ({
    type: types.addProject,
    payload: project
});

export const deleteProject = (projectID) => ({
    type: types.deleteProject,
    payload: projectID
})