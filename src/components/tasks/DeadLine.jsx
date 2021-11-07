import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { startUpdateTask } from '../../actions/tasksActions';
import { swalConfirm } from '../../helpers/swalConfirm';
import { FormDate } from '../ui/FormDate';

export const DeadLine = ({deadLine, id, projectID}) => {

    const dispatch = useDispatch();

    const [editDeadLine, setEditDeadLine] = useState(false);
    const [date, setDate] = useState(new Date(deadLine));
    const [remaining, setRemaining] = useState(Math.round((date.getTime() - new Date().getTime()) / (1000*60*60*24)));
    
    useEffect(() => {
        setRemaining(Math.round((date.getTime() - new Date().getTime()) / (1000*60*60*24)));
    }, [date])

    const handleUploadDeadLine = (e) => {
        e.preventDefault();

        dispatch(startUpdateTask(projectID, id, {
            deadLine: date.toJSON()
        }));

        setEditDeadLine(false);
    }

    const handleDeleteDeadLine = () => {
        swalConfirm('¿Seguro que quieres eliminar la Fecha Límite?', 'Se ha Eliminado la Fecha Límite', () => {
            dispatch(startUpdateTask(projectID, id, {
                deadLine: false
            }));
        })    
    }


    return (
        <div className='task__deadLine-container'>
            {
                editDeadLine ?
                (
                    <FormDate handleSubmit={handleUploadDeadLine} date={date} setDate={setDate} setter={setEditDeadLine} />
                )
                : (
                    <div className="deadLine__data-main">
                        <div className="deadLine__data" onClick={() => setEditDeadLine(true)}>
                            <p> <strong>Fecha Límite:</strong> {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()} </p>
                            <p className={remaining >= 10 ?'project__budget' : remaining >= 5 ? 'project__budget yellow' : 'project__budget red'}>
                                <strong>Faltan:</strong> {remaining} Días
                            </p>
                            <i className="fas fa-pencil" onClick={() => setEditDeadLine(true)}></i>
                        </div>
                        <button className="btn task__deadLine-delete" onClick={handleDeleteDeadLine}><i className="fas fa-times"></i></button>
                    </div>
                )
            }
        </div>
    )
}
