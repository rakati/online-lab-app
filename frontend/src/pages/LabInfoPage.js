// src/pages/LabInfoPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLabById, deleteLab } from '../services/labApi';
import { useAuth } from '../context/AuthContext';

function LabInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchLab();
  }, [id]);

  const fetchLab = async () => {
    try {
      const data = await fetchLabById(id);
      setLab(data);
    } catch (err) {
      console.error(err);
      setError('Could not load lab info.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLab(id);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  if (!lab) {
    return <div className="p-4 dark:bg-gray-900 dark:text-gray-100">Loading...</div>;
  }

  const isOwner = user && user.id === lab.created_by;

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {error && <div className="bg-red-200 text-red-700 p-2 rounded mb-2">{error}</div>}
      <h1 className="text-2xl font-bold mb-2">{lab.title}</h1>
      {lab.image && (
        <img
          src={lab.image}
          alt={lab.title}
          className="w-full max-h-64 object-cover mb-2"
        />
      )}
      <p className="mb-4">{lab.description}</p>
      {lab.tags && (
        <div className="flex gap-2 mb-4">
          {lab.tags.map((t, idx) => (
            <span key={idx} className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      )}
      <p className="mb-4">Difficulty: {lab.difficulty}</p>

      {/* If you want to show instructions as rendered Markdown, you can do so with ReactMarkdown or dangerouslySetInnerHTML if you trust it */}
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <div className="prose dark:prose-invert max-w-none">
        {/* Use ReactMarkdown or direct HTML if stored. Example with ReactMarkdown: */}
        {/* <ReactMarkdown>{lab.instructions}</ReactMarkdown> */}
        {/* Or if it's raw MD, parse it. If you stored HTML on the backend, do: */}
        <div dangerouslySetInnerHTML={{ __html: lab.instructions }} />
      </div>

      {/* Actions */}
      {isOwner && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => navigate(`/lab/${lab.id}/edit`)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default LabInfoPage;
