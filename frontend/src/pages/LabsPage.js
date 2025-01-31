// src/pages/LabsPage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LabCard from '../components/LabCard';
import { useSelector } from 'react-redux';
import { fetchLabs as fetchLabsApi } from '../services/labApi';

const LabsPage = () => {
  const [search, setSearch] = useState('');
  const [labs, setLabs] = useState([]);
  const { user } = useAuth();// or context-based user

  const fetchLabs = async () => {
      try {
        const res = await fetchLabsApi(); // Custom API call that fetches instructor labs
        setLabs(res.results);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    fetchLabs();
  }, []);

  const filteredLabs = labs.filter((lab) =>
    lab.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-8 py-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Labs</h1>
        {/* If user is instructor, show add-lab button */}
        {user?.is_instructor && (
          <a
            href="/add-lab"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Lab
          </a>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Labs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded mb-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      />

      {/* Lab grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            user={user}
            onRefresh={fetchLabs} // Refresh after subscribe/unsubscribe
          />
        ))}
      </div>
    </div>
  );
};

export default LabsPage;
