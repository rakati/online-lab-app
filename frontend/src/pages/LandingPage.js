import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Online Lab Application</h1>
      <p className="text-lg mb-6 text-gray-300">
        The ultimate platform for interactive programming labs.
      </p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
