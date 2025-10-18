import React from 'react';
import { Link } from 'react-router-dom';

// একটি সুন্দর SVG আইকন যা পেজ খুঁজে না পাওয়ার বিষয়টি বোঝায়
const NotFoundIcon = () => (
    <svg className="w-40 h-40 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 14.5l-5-5" />
    </svg>
);


const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="relative">
          <div className="absolute -top-10 -left-10 z-0">
             <NotFoundIcon />
          </div>
          <div className="relative z-10">
            <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mt-4">
                Page Not Found
            </h2>
            <p className="mt-4 text-gray-500 max-w-md mx-auto">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="mt-8 inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
                Go to Homepage
            </Link>
          </div>
      </div>
    </div>
  );
};

export default NotFoundPage;