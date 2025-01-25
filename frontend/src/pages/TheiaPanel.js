import React from 'react';

const TheiaPanel = () => {
  return (
    <div className="bg-gray-700 p-4 flex-grow">
      <iframe
        src="http://localhost:4000"
        className="w-full h-full border-0"
        title="Theia IDE"
      ></iframe>
    </div>
  );
};

export default TheiaPanel;
