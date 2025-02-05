// src/pages/LabInfoPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLabById, subscribeToLab, unsubscribeFromLab } from '../services/labApi';
import { useSelector } from 'react-redux';

function LabInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.user);

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

  const handleSubscribe = async () => {
    try {
      await subscribeToLab(lab.id);
    } catch (err) {
      console.error(err);
      setError('Lab not found.');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromLab(lab.id);
    } catch (err) {
      console.error(err);
      setError('Lab not found.');
    }
  };

  console.log("lab.data", lab);
  const isSubscribed = lab?.isParticipant;

  if (!lab) {
    return <div className="p-4 dark:bg-gray-900 dark:text-gray-100">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg p-8">
        {/* Lab Image */}
        <img
          src={lab.image || require('../assets/containers-kubernets.png')}
          alt={lab.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow"
        />

        {/* Lab Title */}
        <h1 className="text-3xl font-bold mb-4">{lab.title}</h1>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{lab.description}</p>

        {/* Skills & Time Required */}
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">⏳ Time needed:</span> {lab.timeNeeded || 'N/A'}
          </p>
          {lab.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">🎯 Skills:</span>
              {lab.skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subscription Buttons */}
        <div className="flex gap-4 mt-6">
          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
            >
              Subscribe
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(`/labs/${lab.id}/start`)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Start Lab
              </button>
              <button
                onClick={handleUnsubscribe}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Unsubscribe
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

}

export default LabInfoPage;
