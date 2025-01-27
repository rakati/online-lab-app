import React, { useState } from 'react';
import Tutorial from './Tutorial';
import TheiaPanel from './TheiaPanel';
import markdownContents from './MarkdownText'

const LabPage = () => {
  let markdownContent = `
# Welcome to the Lab
Learn how to write clean and beautiful Markdown with styled code snippets.

## Features
- Dynamic Theme Toggle
- Styled Headers
- Code Snippet Support

### Code Snippet Example
\`\`\`javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // Output: 5
\`\`\`

Visit [our website](https://example.com) for more tutorials.
here is simple python code:
\`\`\`python
import numpy as np

arr = np.arange(1, 3)
print(arr)

\`\`\`
`;
  markdownContent = markdownContents;
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
