import React, { useState, useEffect } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Showdown from 'showdown';

// optional: for custom styling, dark mode adjustments, etc.
import remarkGfm from 'remark-gfm'; // if you want GFM features in final display
import rehypeHighlight from 'rehype-highlight';

const converter = new Showdown.Converter();

function CreateLabPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [packages, setPackages] = useState([]);
  // This is the Markdown instructions
  const [instructions, setInstructions] = useState('');
  // For demonstration, a simple array of possible packages:
  const availablePackages = ['python', 'nodejs', 'java', 'tensorflow', 'pytorch'];

  // We can store a "status" field (draft/published). This can be determined by button press.
  const [status, setStatus] = useState('DRAFT');

  // If you want to store partial data in local storage in case the tab closes:
  useEffect(() => {
    const savedData = localStorage.getItem('labDraftData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || '');
      setDescription(parsed.description || '');
      setInstructions(parsed.instructions || '');
      setPackages(parsed.packages || []);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever form data changes
    const draftData = {
      title,
      description,
      instructions,
      packages,
    };
    localStorage.setItem('labDraftData', JSON.stringify(draftData));
  }, [title, description, instructions, packages]);

  const handleChangePackages = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPackages((prev) => [...prev, value]);
    } else {
      setPackages((prev) => prev.filter((pkg) => pkg !== value));
    }
  };

  // react-markdown-editor-lite demands a specific handleEditorChange:
  const handleEditorChange = ({ text }) => {
    setInstructions(text);
  };

  const handleSubmit = (publish = false) => {
    // If "Publish" button is clicked, we might set status to "PUBLISHED"
    // else keep "DRAFT"
    const finalStatus = publish ? 'PUBLISHED' : 'DRAFT';
    setStatus(finalStatus);

    // Gather the data
    const labData = {
      title,
      description,
      packages,
      instructions,
      status: finalStatus,
    };

    // do an API call to the Django backend
    fetch('/api/labs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(labData),
      credentials: 'include', // if you're using cookie-based auth
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Created lab:', data);
        // optionally clear localStorage, or redirect
        localStorage.removeItem('labDraftData');
        // maybe navigate to labs list or the newly created lab
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4 overflow-auto dark:bg-gray-900 dark:text-gray-200 h-full">
      <h1 className="text-2xl font-bold mb-4">Create New Lab</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="border border-gray-300 dark:border-gray-700 rounded w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="border border-gray-300 dark:border-gray-700 rounded w-full p-2"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Packages</label>
        <div className="flex flex-wrap gap-4">
          {availablePackages.map((pkg) => (
            <label key={pkg} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                value={pkg}
                checked={packages.includes(pkg)}
                onChange={handleChangePackages}
              />
              <span className="capitalize">{pkg}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Instructions</label>
        <MarkdownEditor
          // For advanced usage, you can customize the config,
          // the toolbar, or use a custom showdown converter
          value={instructions}
          renderHTML={(text) => converter.makeHtml(text)}
          onChange={handleEditorChange}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,  // ensures the preview panel is visible
            },
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit(false)} // draft
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save as Draft
        </button>
        <button
          onClick={() => handleSubmit(true)} // publish
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default CreateLabPage;
