import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";

export const startLoadTasks = (uid, projectID) => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const tasksSnap = await getDocs(query(collection(db, uid, 'data', 'projects', projectID, 'tasks'), orderBy('date', 'desc')));
        const tasks = [];
        
        tasksSnap.docs.forEach(snap => {
            tasks.push({
                ...snap.data(),
                id: snap.id
            });
        });
        
        dispatch(stopLoading());
        dispatch(loadTasks(tasks));
    }
}

export const startAddTask = (projectID, task) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta añadiendo la Tarea', 'Por favor, espere');
        addDoc(collection(db, auth.currentUser.uid, 'data', 'projects', projectID, 'tasks'), task)
            .then(taskRef => {
                Swal.fire(`Se ha Agregado la Tarea`, '', 'success');
                Swal.close();
                
                const newTask = {
                    ...task,
                    id: taskRef.id
                }

                dispatch(addTask(newTask));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startUpdateTask = (projectID, taskID, task) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta actualizando la información de la Tarea', 'Por favor, espere');
        updateDoc(doc(db, auth.currentUser.uid, 'data', 'projects', projectID, 'tasks', taskID), task)
            .then(() => {
                Swal.close();
                dispatch(updateTask(taskID, task));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startDeleteTask = (projectID, taskID) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta eliminando la tarea', 'Por favor, espere');
        deleteDoc(doc(db, auth.currentUser.uid, 'data', 'projects', projectID, 'tasks', taskID))
            .then(() => {
                dispatch(deleteTask(taskID));
                Swal.fire('Se ha eliminado la tarea', '', 'success');
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const loadTasks = (tasks) => ({
    type: types.loadTasks,
    payload: tasks
});

export const addTask = (task) => ({
    type: types.addTask,
    payload: task
});

export const updateTask = (taskID, task) => ({
    type: types.updateTask,
    payload: {
        taskID,
        task
    }
});

export const deleteTask = (taskID) => ({
    type: types.deleteTask,
    payload: taskID
});

export const cleanTasks = () => ({
    type: types.cleanTasks
});