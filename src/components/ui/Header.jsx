import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSidebar, openSiderbar } from '../../actions/uiActions';

export const Header = () => {

    const {open} = useSelector(state => state.ui);
    const {username} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    
    const handleToggle = () => {
        open ? dispatch(closeSidebar()) : dispatch(openSiderbar());
    }

    return (
        <header className={open ? 'dashboard__header open' : 'dashboard__header'} id="header">
            <div className="dashboard__header_toggle" onClick={handleToggle}> 
                <i className={open ? 'fas fa-times' : 'fas fa-bars'} id="header-toggle"></i>
            </div>
            
            <Link to='/account' className='dashboard__account'>
                <p>Hola! {username}</p>
                <div className="dashboard__header_img">
                    <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
                </div>
            </Link>
        </header>
    )
}
