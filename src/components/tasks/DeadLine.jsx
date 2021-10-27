import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { swalConfirm } from '../../helpers/swalConfirm';

export const DeadLine = ({deadLine}) => {

    const [editDeadLine, setEditDeadLine] = useState(false);
    
    const [date, setDate] = useState(deadLine);
    
    const [remaining, setRemaining] = useState(Math.round((deadLine.getTime() - new Date().getTime()) / (1000*60*60*24)));
    
    useEffect(() => {
        setRemaining(Math.round((deadLine.getTime() - new Date().getTime()) / (1000*60*60*24)));
    }, [deadLine])

    const handleUploadDeadLine = (e) => {
        e.preventDefault();

        setEditDeadLine(false);
    }

    const handleDeleteDeadLine = () => {
        swalConfirm('¿Seguro que quieres eliminar la Fecha Límite?', 'Se ha Eliminado la Fecha Límite', () => {})    
    }


    return (
        <div className='task__deadLine-container'>
            {
                editDeadLine ?
                (
                    <form className='task__deadLine project__title-form' onSubmit={handleUploadDeadLine}>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)} />
                        <div className='form__buttons-container'>
                            <button className='form__btn' type='submit'><i className='fas fa-check'></i></button>
                            <button className='form__btn' onClick={() => setEditDeadLine(false)}><i className='fas fa-times'></i></button>
                        </div>
                    </form>
                )
                : (
                    <div className="deadLine__data-main">
                        <div className="deadLine__data" onClick={() => setEditDeadLine(true)}>
                            <p> <strong>Fecha Límite:</strong> {deadLine.getDate()} / {deadLine.getMonth() + 1} / {deadLine.getFullYear()} </p>
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
