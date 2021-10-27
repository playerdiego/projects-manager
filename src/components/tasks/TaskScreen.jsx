import React, {useEffect, useRef} from 'react'
import { getProjectById } from '../../helpers/getProjectById';
import { getTaskById } from '../../helpers/getTaskById'
import { TaskHeader } from './TaskHeader';
import {Editor} from '@tinymce/tinymce-react';
import { closeSidebar } from '../../actions/uiActions';
import { useDispatch } from 'react-redux';
import { swalConfirm } from '../../helpers/swalConfirm';
import { Delete } from '../ui/Delete';

export const TaskScreen = ({match: {params: {taskID}}}) => {

    const task = getTaskById(taskID);
    const project = getProjectById(task.projectID);
    const editorRef = useRef(Editor);

    const handleEditChange = () => {
        // console.log(editorRef.current.getContent());
    }

    // const handleUploadTask = () => {

    // }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
        document.querySelector("body").scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [dispatch]);

    const handleDeleteTask = () => {
        swalConfirm('¿Seguro que quieres eliminar la Tarea? Se borrarán todos los datos', 'Se ha eliminado la Tarea', () => {});
    }

    return (
        <>
            <TaskHeader task={task} project={project} />

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
            <button className='btn task__btn'>Guardar</button>
            <Delete action={handleDeleteTask} />
        </>
    )
}
