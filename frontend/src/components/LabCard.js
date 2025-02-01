import React from 'react';
import { Link } from "react-router";

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
    //   <div className="flex gap-2">
    //     {isOwner && (
    //       <>
    //         <button className="bg-blue-500 text-white px-2 py-1 rounded">
    //           Edit
    //         </button>
    //         <button className="bg-red-500 text-white px-2 py-1 rounded">
    //           Delete
    //         </button>
    //       </>
    //     )}

    //     {!isOwner && isPublished && (
    //       <>
    //         <button
    //           onClick={handleSubscribe}
    //           className="bg-green-500 text-white px-2 py-1 rounded"
    //         >
    //           Subscribe
    //         </button>
    //         <button
    //           onClick={handleUnsubscribe}
    //           className="bg-yellow-500 text-white px-2 py-1 rounded"
    //         >
    //           Unsubscribe
    //         </button>
    //       </>
    //     )}
    //     </div>
    //     </div>
    // </div>

    <div
      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg cursor-pointer"
    >
      <img
        src={lab.image || require('../assets/containers-kubernets.png')}
        alt={lab.title}
        className="w-full h-32 object-cover rounded mb-4 border border-gray-300 dark:border-gray-700"
      />
      <h2 className="text-xl font-bold mb-2">
        <Link to={`/labs/${lab.id}`}>{lab.title}</Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-400">{lab.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Time: {lab.time || 2} hours</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Skills: Python, Data Analysis</p>
      <div className="flex space-x-2 mt-2">

        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Python</span>
        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Data</span>
      </div>
    </div>

  );
};

export default LabCard;
