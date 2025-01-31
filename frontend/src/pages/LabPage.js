import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Tutorial from './Tutorial';
import TheiaPanel from './TheiaPanel';
import markdownContents from './MarkdownText'

const LabPage = () => {
  let markdownContent = `
# Getting Started with Node.js
Follow these steps to complete the lab:
## What You Will Learn
1. Set up Node.js.
2. Write and run a simple program.
3. Customize the project.

**Let's get started!**
  `;

  markdownContent = markdownContents
  const [leftWidth, setLeftWidth] = useState(50);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleResize = (e) => {
    const newWidth = ((e.clientX - 64) / (window.innerWidth - 64)) * 100; // Adjust for sidebar width
    setLeftWidth(Math.min(Math.max(newWidth, 20), 80)); // Restrict resizing between 20% and 80%
  };

  return (
    <div className="flex h-screen">

      {/* Split Layout */}
      <div className="flex flex-1">
        {/* Tutorial Section */}
        <div className="bg-gray-100 relative ${
          leftWidth < 5 ? 'hidden' : ''
          }`}"
          style={{ width: `${leftWidth}%` }}
        >
          <Tutorial markdownContent={markdownContent} />
        </div>

        {/* Resizer */}
        <div
          className="relative bg-gray-600 cursor-col-resize"
          style={{ width: '5px'}}
          onMouseDown={(e) => {
            e.preventDefault();
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleResize);
            });
          }}
        >
          {/* Collapse button */}
          <button
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 rounded-full p-3"
            onClick={() => {
              if (leftWidth < 5) {
                // If it's collapsed, restore
                setLeftWidth(50);
              } else {
                // Collapse it
                setLeftWidth(0);
              }
            }}
          >
            {/* Icon can depend on isCollapsed */}
            {leftWidth < 5 ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Theia IDE Section */}
        <TheiaPanel />
      </div>
    </div>
  );
};

export default LabPage;
