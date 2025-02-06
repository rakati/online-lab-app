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
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchLabById(id);
        setLab(data);
      } catch (err) {
        console.error(err);
        setError('Could not load lab info.');
      }
    })();
  }, [id]);

  const handleSubscribe = async () => {
    try {
      if (!isLoggedIn) navigate("/login");
      await subscribeToLab(lab.id);
      // Update local state so user sees immediate change
      setLab({ ...lab, isParticipant: true, participantCount: (lab.participantCount || 0) + 1 });
    } catch (err) {
      console.error(err);
      setError('Lab not found or subscription failed.');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromLab(lab.id);
      setLab({ ...lab, isParticipant: false, participantCount: Math.max(0, (lab.participantCount || 1) - 1) });
    } catch (err) {
      console.error(err);
      setError('Lab not found or unsubscribing failed.');
    }
  };

  if (!lab) {
    return <div className="p-4 dark:bg-gray-900 dark:text-gray-100">Loading... {error && error}</div>;
  }

  const isSubscribed = lab.isParticipant;

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

        {/* Info Row: Language, Difficulty, Subscribers Count */}
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm">
            Language: {lab.language?.toUpperCase() || 'ENG'}
          </span>
          <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm">
            Difficulty: {lab.difficulty}
          </span>
          <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm">
            Subscribers: {lab.participantCount ?? 0}
          </span>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {lab.description}
        </p>

        {/* Skills & Time Required */}
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">⏳ Time needed:</span> {lab.time || 'N/A'} min
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

        {/* Tags */}
        {lab.tags?.length > 0 && (
          <div className="mb-6">
            <span className="font-semibold text-gray-700 dark:text-gray-300">🏷 Tags:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {lab.tags.map((t) => (
                <span
                  key={t}
                  className="bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

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
