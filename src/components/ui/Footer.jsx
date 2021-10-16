import React from 'react'

export const Footer = () => {

    const date = new Date();

    return (
        <footer className="footer__container">
            <strong>Todos los derechos reservados &copy; {date.getFullYear()} Mucui Estudio</strong>
            <div>
                <b>Desarrollado por:</b> Diego Sebastián y <a href='https://mucui.net' target='_blank' rel="noreferrer">Mucui Estuio</a>
            </div>
        </footer>
    )
}
