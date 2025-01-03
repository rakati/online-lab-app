import React from 'react';

const SplitPage = () => {
  return (
    <div className="flex h-screen">
      {/* Tutorial Section */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Tutorial</h2>
        <p>
          Welcome to the tutorial section! Here, you'll find step-by-step instructions
          for completing your lab.
        </p>
        <ol className="list-decimal list-inside">
          <li>Step 1: Do this...</li>
          <li>Step 2: Do that...</li>
          <li>Step 3: Complete the lab!</li>
        </ol>
      </div>

      {/* Theia IDE Section */}
      <div className="w-1/2 bg-white p-4">
        <h2 className="text-2xl font-bold mb-4">Theia IDE</h2>
        <iframe
          src="http://example.com"
          className="w-full h-full border"
          title="Theia IDE"
        ></iframe>
      </div>
    </div>
  );
};

export default SplitPage;
