import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { FaBars, FaPrint, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

const Tutorial = ({ markdownContent }) => {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const contentRef = useRef(null);
  const tocRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--tutorial-font-size', `${zoom}%`);
  }, [zoom]);

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
          ${contentRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Extract TOC and add IDs dynamically
  const extractToc = (markdown) => {
    const toc = [];
    const lines = markdown.split('\n');
    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const title = match[2];
        const id = title.toLowerCase().replace(/\s+/g, '-');
        toc.push({ level, title, id });
      }
    });
    return toc;
  };

  const toc = extractToc(markdownContent);

  // Close TOC when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tocRef.current && !tocRef.current.contains(event.target)) {
        setIsTocOpen(false);
      }
    };
    if (isTocOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTocOpen]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Navbar (Fixed at the Top) */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
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
          <button onClick={handleZoomOut} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
            <FaMinus size={18} />
          </button>
          <button onClick={handleZoomIn} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
            <FaPlus size={18} />
          </button>
          <button onClick={handlePrint} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500">
            <FaPrint size={18} />
          </button>
        </div>
      </div>

      {/* TOC Sidebar */}
      {isTocOpen && (
        <div
          ref={tocRef}
          className="absolute top-0 left-0 z-50 h-full w-64 bg-gray-800 shadow-lg transition-transform transform translate-x-0"
        >
          <div className="p-4 overflow-y-auto h-full scrollbar-thin">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Table of Contents</h2>
              <button onClick={() => setIsTocOpen(false)} className="text-gray-400 hover:text-gray-200">
                <FaTimes size={18} />
              </button>
            </div>
            <ul className="space-y-2">
              {toc.map((item, index) => (
                <li
                  key={index}
                  className={`ml-${item.level * 2} text-sm hover:text-blue-400 cursor-pointer`}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsTocOpen(false);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tutorial Content with Scrollbar */}
      <div
        className="flex-1 overflow-y-auto p-4 scrollbar-thin"
      >
        <div ref={contentRef} className="tutorial-content break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
