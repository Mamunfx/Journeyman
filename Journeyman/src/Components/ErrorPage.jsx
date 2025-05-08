import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center">
            <h1 className="text-7xl font-bold">404</h1>
            <p className="text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
            <button 
                className="mt-6 px-4 py-2 text-lg font-medium text-white bg-customColor rounded-full shadow-lg hover:bg-green-200 transition duration-300 "
                onClick={() => window.location.href = '/'}>
                Go Home
            </button>
        </div>
    );
};

export default ErrorPage;
