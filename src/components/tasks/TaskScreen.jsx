import React, {useEffect, useRef, useState} from 'react'
import { getProjectById } from '../../helpers/getProjectById';
import { getTaskById } from '../../helpers/getTaskById'
import { TaskHeader } from './TaskHeader';
import {Editor} from '@tinymce/tinymce-react';
import { closeSidebar } from '../../actions/uiActions';
import { useDispatch } from 'react-redux';
import { swalConfirm } from '../../helpers/swalConfirm';
import { Delete } from '../ui/Delete';
import { useSelector } from 'react-redux';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { Loading } from '../ui/Loading';
import { cleanTasks, startDeleteTask, startLoadTasks, startUpdateTask } from '../../actions/tasksActions';
import { getAuth } from '@firebase/auth';
import { Navigate, useNavigate, useParams } from 'react-router';

export const TaskScreen = () => {

    const params = useParams();
    const {taskID, projectID} = params;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tasks = useSelector(state => state.tasks);
    const projects = useSelector(state => state.projects);


    const [task, setTask] = useState(null);
    const [project, setProject] = useState(null);
    const [desc, setDesc] = useState('');
    
    const editorRef = useRef(Editor);

    useEffect(() => {
        const auth = getAuth();
        dispatch(startLoadTasks(auth.currentUser.uid, projectID));

        return () => {
            dispatch(cleanTasks());
        }
    }, [dispatch, projectID])

    useEffect(() => {
        setProject(getProjectById(projectID, projects));
        if(tasks.length > 0) {
            setTask(getTaskById(taskID, tasks));
        }
    }, [tasks, taskID, projectID, projects]);

    useEffect(() => {
        if(task) {
            setDesc(task.desc);
        }
    }, [task]);

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const handleEditChange = () => {
        setDesc(editorRef.current.getContent());
    }

    const handleUploadTask = () => {
        dispatch(startUpdateTask(projectID, taskID, {
            desc: editorRef.current.getContent()
        }));
    }

    const handleDeleteTask = () => {
        swalConfirm('¿Seguro que quieres eliminar la Tarea? Se borrarán todos los datos', 'Se ha eliminado la Tarea', () => {
            dispatch(startDeleteTask(projectID, taskID));
            navigate(`/project/${projectID}`, {replace: true});
        });
    }

    if (task === null) {
        if(project === undefined) {
            return <Navigate to='/' />
        } else {
            return <Loading />
        }
    }


    

    return (
        <>
            <TaskHeader task={task} project={project} desc={desc} />

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey="i4nv31tte7rm14j7ea3vr3xybc9bih3gq11ky1lv3151q8d8"
                initialValue={task.desc}
                onEditorChange={handleEditChange}
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | code | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                }}
            />
            <button className='btn task__btn' onClick={handleUploadTask}>Guardar</button>
            <Delete action={handleDeleteTask} />
        </>
    )
}
