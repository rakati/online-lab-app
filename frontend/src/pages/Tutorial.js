import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaPrint, FaPlus, FaMinus } from 'react-icons/fa';

const Tutorial = ({ markdownContent }) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handlePrint = () => window.print();

  return (
    <div
      className="bg-gray-100 p-4 overflow-y-auto"
      style={{ fontSize: `${zoom}%` }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tutorial</h2>
        <div className="flex space-x-2">
          <button onClick={handleZoomOut} className="hover:text-gray-500">
            <FaMinus />
          </button>
          <button onClick={handleZoomIn} className="hover:text-gray-500">
            <FaPlus />
          </button>
          <button onClick={handlePrint} className="hover:text-gray-500">
            <FaPrint />
          </button>
        </div>
      </div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default Tutorial;
