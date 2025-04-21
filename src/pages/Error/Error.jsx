import React from 'react'
import './Error.scss';

const Error = () => {
    return (
        <div className="error-container d-flex justify-content-center align-items-center flex-column">
            <p className="error-message lead">An unknown error occured!</p>
            <a href="/" className="btn btn-custom mt-4">Go Home</a>
        </div>
    )
}

export default Error
