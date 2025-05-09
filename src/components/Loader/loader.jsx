import React from 'react';
import './loader.css';

// Loader component to display a loading spinner
const Loader = () => {
    return (
        <div className="loader">
            {/* Spinner element for the loading animation */}
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;