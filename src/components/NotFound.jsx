import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../assets/404-animation.json'; // Make sure this file exists

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <div className="w-72 h-72">
                <Lottie animationData={animationData} loop={true} />
            </div>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you're looking for doesn't exist. Maybe it's hiding from you!
            </p>
            <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                <FaHome className="text-xl" />
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
