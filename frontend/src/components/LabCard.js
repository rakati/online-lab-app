import React from 'react';

const LabCard = ({ lab, user, onRefresh }) => {
  // If your user object has isInstructor or similar
  const isOwner = user && lab.created_by === user.id;
  const isPublished = lab.status === 'PUBLISHED';

  const handleSubscribe = () => {
    fetch(`/api/labs/${lab.id}/subscribe/`, { method: 'POST', credentials: 'include' })
      .then(res => res.json())
      .then(() => onRefresh && onRefresh())
      .catch(err => console.error(err));
  };

  const handleUnsubscribe = () => {
    fetch(`/api/labs/${lab.id}/unsubscribe/`, { method: 'POST', credentials: 'include' })
      .then(res => res.json())
      .then(() => onRefresh && onRefresh())
      .catch(err => console.error(err));
  };

  // Edit / Delete would be similar calls or navigation
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{lab.title}</h2>
      {lab.image && (
        <img
          src={lab.image}
          alt={lab.title}
          className="max-h-40 w-full object-cover rounded mb-2"
        />
      )}
      <p className="text-sm mb-2">{lab.description}</p>

      <div className="flex gap-2">
        {isOwner && (
          <>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </>
        )}

        {!isOwner && isPublished && (
          <>
            <button
              onClick={handleSubscribe}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Subscribe
            </button>
            <button
              onClick={handleUnsubscribe}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Unsubscribe
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LabCard;
