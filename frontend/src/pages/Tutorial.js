import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { FaBars, FaPrint, FaPlus, FaMinus } from 'react-icons/fa';
import 'highlight.js/styles/github-dark.css'; // Replace with your preferred Highlight.js theme

const Tutorial = ({ markdownContent }) => {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Tutorial</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          ${document.querySelector('.tutorial-content').innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Extract Table of Contents
  const extractToc = (markdown) => {
    const toc = [];
    const lines = markdown.split('\n');
    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/); // Match headings (#, ##, ###)
      if (match) {
        const level = match[1].length; // Number of # characters
        const title = match[2]; // Heading text
        toc.push({ level, title });
      }
    });
    return toc;
  };

  const toc = extractToc(markdownContent);

  return (
    <div className="h-screen flex bg-gray-900 text-gray-200">
      {/* TOC Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 shadow-lg transition-transform transform ${
          isTocOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-400 scrollbar-track-gray-800 dark:scrollbar-track-gray-600">
          <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {toc.map((item, index) => (
              <li
                key={index}
                className={`ml-${item.level * 2} text-sm hover:text-blue-400`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tutorial Panel */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Navbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
              title="Table of Contents"
            >
              <FaBars size={18} />
            </button>
            <h2 className="text-lg font-bold">Table of Contents</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleZoomOut}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
              title="Zoom Out"
            >
              <FaMinus size={18} />
            </button>
            <button
              onClick={handleZoomIn}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
              title="Zoom In"
            >
              <FaPlus size={18} />
            </button>
            <button
              onClick={handlePrint}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
              title="Print"
            >
              <FaPrint size={18} />
            </button>
          </div>
        </div>

        {/* Tutorial Content */}
        <div
          className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-800"
        >
          <div className="p-6 tutorial-content" >
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              children={markdownContent}
              className="prose prose-invert max-w-none"
              style={{ fontSize: `${zoom}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
