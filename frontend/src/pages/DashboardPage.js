import React, { useState, useEffect } from "react";
import { deleteLab, fetchLabs as fetchLabsApi } from "../services/labApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaPlus, FaPencilAlt } from "react-icons/fa"; // Import icons

function DashboardPage() {
  const [labs, setLabs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [labToDelete, setLabToDelete] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) fetchLabs();
  }, [user]);

  const fetchLabs = async () => {
    try {
      const data = await fetchLabsApi();
      setLabs(data.results || []);
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
    <div className="p-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Instructor Dashboard</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          onClick={() => navigate("/labs/new")}
        >
          <FaPlus /> <span className="hidden sm:inline">Add New Lab</span>
        </button>
      </div>

      {/* Labs Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Participants</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labs.length > 0 ? (
              labs.map((lab, index) => (
                <tr
                  key={lab.id}
                  className={`border-b border-gray-300 dark:border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : ""
                  }`}
                >
                  <td className="p-4 text-gray-900 dark:text-gray-100">{lab.title}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-300">{lab.status}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-300">{lab.participantCount || 0}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/labs/${lab.id}`)}
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                    >
                      <FaEye className="text-xl" />
                    </button>
                    <button
                      onClick={() => navigate(`/labs/${lab.id}/edit`)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                    >
                      <FaPencilAlt className="text-xl" />
                    </button>
                    <button
                      onClick={() => {
                        setLabToDelete(lab);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-700 dark:text-gray-300">
                  No labs found. Start by adding a new lab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && labToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Confirm Delete
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Are you sure you want to delete <b>"{labToDelete.title}"</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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
