import React from 'react';
import '../assets/spinner.css'

const LoadingScreen = () => {
    return (
        <div className='spinnerBox'>
            <div className="lds-hourglass"></div>
        </div>
    );
};

export default LoadingScreen;