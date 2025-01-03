import React, { useState } from 'react';

const LabPage = () => {
  const [leftWidth, setLeftWidth] = useState(50);

  const handleResize = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.min(Math.max(newWidth, 20), 80)); // Limit resizing between 20% and 80%
  };

  return (
    <div className="flex h-screen">
      {/* Tutorial Section */}
      <div
        className="bg-gray-800 p-4 overflow-y-auto"
        style={{ width: `${leftWidth}%` }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Tutorial</h2>
        <p className="text-gray-300">
          Welcome to the tutorial section. Follow these instructions to
          complete the lab.
        </p>
      </div>

      {/* Resizer */}
      <div
        className="bg-gray-600 cursor-col-resize"
        style={{ width: '5px' }}
        onMouseDown={(e) => {
          e.preventDefault();
          document.addEventListener('mousemove', handleResize);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleResize);
          });
        }}
      ></div>

      {/* Theia IDE Section */}
      <div className="bg-gray-700 p-4 flex-grow">
        <iframe
          src="http://example.com"
          className="w-full h-full border-0"
          title="Theia IDE"
        ></iframe>
      </div>
    </div>
  );
};

export default LabPage;
