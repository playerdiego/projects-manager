import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { closeSidebar, openSiderbar } from '../../actions/uiActions';

export const Header = () => {

    const {open} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    
    const handleToggle = () => {
        open ? dispatch(closeSidebar()) : dispatch(openSiderbar());
    }

    return (
        <header className={open ? 'dashboard__header open' : 'dashboard__header'} id="header">
            <div className="dashboard__header_toggle" onClick={handleToggle}> 
                <i className={open ? 'fas fa-times' : 'fas fa-bars'} id="header-toggle"></i>
            </div>
            <div className="dashboard__header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt="" /> </div>
        </header>
    )
}
