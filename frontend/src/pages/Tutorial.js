import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaPrint, FaPlus, FaMinus } from 'react-icons/fa';

const Tutorial = ({ markdownContent }) => {
  const [zoom, setZoom] = useState(100);
  const printRef = useRef();

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <tfaritle>Print Tutorial</tfaritle>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

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
      {/* Tutorial Content */}
      <div ref={printRef}>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Tutorial;
