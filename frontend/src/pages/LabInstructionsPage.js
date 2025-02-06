import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchLabById } from '../services/labApi';
import Tutorial from "./Tutorial";

function LabInstructionPage() {
  const { id } = useParams();
  const [lab, setLab] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState('');

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

  if (!lab || !lab.instructions) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">{lab.title}</h1>
          <Tutorial markdownContent={lab.instructions} />
      </div>
    </div>
  );
}

export default LabInstructionPage;
