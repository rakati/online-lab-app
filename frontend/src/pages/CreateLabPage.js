import React, { useState } from 'react';

const CreateLabPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    packages: [],
  });

  const packagesList = ['Python', 'Node.js', 'NPM', 'Docker'];

  const handleSubmit = () => {
    alert('Lab created successfully!');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Create Lab</h1>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Markdown Editor */}
        <div>
          <label>Instructions</label>
          <textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Packages */}
        <div>
          <label>Packages</label>
          <div className="flex flex-wrap gap-4">
            {packagesList.map((pkg) => (
              <label key={pkg} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={pkg}
                  onChange={(e) => {
                    const newPackages = e.target.checked
                      ? [...formData.packages, pkg]
                      : formData.packages.filter((p) => p !== pkg);
                    setFormData({ ...formData, packages: newPackages });
                  }}
                />
                <span>{pkg}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Lab
        </button>
      </form>
    </div>
  );
};

export default CreateLabPage;
