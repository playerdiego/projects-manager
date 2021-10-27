import React from 'react'

export const Form = ({className = '', handleSubmit, handleInputChange, setter, name, placeholder, value, type = 'text'}) => {
    return (
        <form
            className={className}
            onSubmit={handleSubmit}
        >
            <input
                type={type}
                name={name}
                onChange={handleInputChange}
                value={value}
                placeholder={placeholder}
            />
            <div className='form__buttons-container'>
                <button className='form__btn' type='submit'><i className='fas fa-check'></i></button>
                <button className='form__btn' onClick={() => setter(false)}><i className='fas fa-times'></i></button>
            </div>
        </form>
    )
}