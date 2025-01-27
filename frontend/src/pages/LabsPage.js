import React, { useState } from 'react';

const LabsPage = () => {
  const [search, setSearch] = useState('');
  const labs = [
    { title: 'Lab 1', description: 'Learn containers.' },
    { title: 'Lab 2', description: 'Intro to Kubernetes.' },
  ];

  const filteredLabs = labs.filter((lab) =>
    lab.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Labs</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Labs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded mb-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      />

      {/* Lab Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{lab.title}</h2>
            <p>{lab.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabsPage;
