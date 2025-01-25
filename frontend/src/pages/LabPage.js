import React, { useState } from 'react';
import Tutorial from './Tutorial';
import TheiaPanel from './TheiaPanel';

const LabPage = () => {
  const markdownContent = `
# Getting Started with Node.js
Follow these steps to complete the lab:
## What You Will Learn
1. Set up Node.js.
2. Write and run a simple program.
3. Customize the project.

**Let's get started!**
  `;

  const [leftWidth, setLeftWidth] = useState(50);

  const handleResize = (e) => {
    const newWidth = ((e.clientX - 64) / (window.innerWidth - 64)) * 100; // Adjust for sidebar width
    setLeftWidth(Math.min(Math.max(newWidth, 20), 80)); // Restrict resizing between 20% and 80%
  };

  return (
    <div className="flex h-screen">

      {/* Split Layout */}
      <div className="flex flex-1">
        {/* Tutorial Section */}
        <div className="bg-gray-100" style={{ width: `${leftWidth}%` }}>
          <Tutorial markdownContent={markdownContent} />
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
        <TheiaPanel />
      </div>
    </div>
  );
};

export default LabPage;
