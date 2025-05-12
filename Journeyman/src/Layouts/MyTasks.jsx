import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";


const API_BASE = "https://journeyman-server-sigma.vercel.app";
const DOLLAR_TO_COIN_RATE = 10; // 1 $ = 10 coins

// Extract creation timestamp (in ms) from MongoDB ObjectID
const getCreatedAtFromObjectId = (objectId) => {
  const timestampHex = objectId.substring(0, 8);
  return parseInt(timestampHex, 16) * 1000;
};

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString();
  } catch {
    return isoString;
  }
};

const MyTasks = () => {
  const { user,notifyError,notify } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for editing
  const [modalTask, setModalTask] = useState(null);
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  useEffect(() => {
    if (!user?.email) return;
    fetchTasks();
  }, [user?.email]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/tasks/user/${encodeURIComponent(user.email)}`
      );
      const sorted = res.data
        .slice()
        .sort(
          (a, b) =>
            getCreatedAtFromObjectId(b._id) -
            getCreatedAtFromObjectId(a._id)
        );
      setTasks(sorted);
    } catch (err) {
      //console.error("API Error:", err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const taskToDelete = tasks.find((t) => t._id === id);
    if (!taskToDelete) return;
    if (!window.confirm("Are you sure you want to delete this task?"))
      return;

    try {
      await axios.delete(`${API_BASE}/tasks/${id}`);

      // compute refund
      const workers = Number(taskToDelete.required_workers) || 0;
      const rate = Number(taskToDelete.payable_amount) || 0;
      const refund = workers * rate * DOLLAR_TO_COIN_RATE;

      // get & update coin balance
      const userRes = await axios.get(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`
      );
      const currentCoins = Number(userRes.data.coins) || 0;
      await axios.put(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`,
        { coins: currentCoins + refund }
      );

      setTasks((t) => t.filter((x) => x._id !== id));
    } catch (err) {
      //console.error("Delete & refund error:", err);
      notifyError("Failed to delete task or process refund.");
    }
  };

  const openEditModal = (task) => {
    setModalTask(task);
    setFormData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  const handleUpdate = async (id, updated) => {
    try {
      await axios.put(`${API_BASE}/tasks/${id}`, updated);
      setTasks((old) =>
        old.map((t) => (t._id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      //console.error("Update Error:", err);
      notifyError("Failed to update task");
    }
  };

  const handleModalChange = (e) =>
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!modalTask) return;
    handleUpdate(modalTask._id, formData);
    setModalTask(null);
  };

  if (loading)
    return <p className="text-center text-lg">Loading tasks...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Your Posted Tasks
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Workers</th>
              <th className="p-3 text-left">Pay Rate ($)</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Submission Info</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{t.task_title}</td>
                <td className="p-3">{t.required_workers}</td>
                <td className="p-3">{t.payable_amount}</td>
                <td className="p-3">
                  {formatDate(t.completion_date)}
                </td>
                <td className="p-3">{t.submission_info}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => openEditModal(t)}
                    className="btn btn-sm rounded-full bg-customColor text-white border-customColor" 
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="btn btn-sm btn-danger rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500"
                >
                  No tasks found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalTask && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Task</h3>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  name="task_title"
                  value={formData.task_title}
                  onChange={handleModalChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Task Detail</label>
                <textarea
                  name="task_detail"
                  value={formData.task_detail}
                  onChange={handleModalChange}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm">
                  Submission Info
                </label>
                <textarea
                  name="submission_info"
                  value={formData.submission_info}
                  onChange={handleModalChange}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setModalTask(null)}
                  className="btn btn-sm btn-ghost rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm rounded-full bg-customColor text-white "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;