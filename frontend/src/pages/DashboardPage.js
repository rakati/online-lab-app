import React, { useState, useEffect } from 'react';
import { deleteLab } from '../services/labApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const [labs, setLabs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [labToDelete, setLabToDelete] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // or wherever your user info comes from

  useEffect(() => {
    if (user) {
      fetchLabs();
    }
  }, [user]);

  const fetchLabs = async () => {
    try {
      const data = await fetchLabs(); // Custom API call that fetches instructor labs
      setLabs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!labToDelete) return;
    try {
      await deleteLab(labToDelete.id);
      setShowDeleteModal(false);
      setLabToDelete(null);
      fetchLabs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/add-lab')}
        >
          + Add New Lab
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead className="border-b border-gray-300 dark:border-gray-700">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Participants</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr key={lab.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-2">{lab.title}</td>
              <td className="p-2">{lab.status}</td>
              <td className="p-2">{lab.participants?.length || 0}</td>
              <td className="p-2 text-right space-x-2">
                <button
                  onClick={() => navigate(`/lab/${lab.id}`)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/lab/${lab.id}/edit`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setLabToDelete(lab);
                    setShowDeleteModal(true);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && labToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete "{labToDelete.title}"?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
