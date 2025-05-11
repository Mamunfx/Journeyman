import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const API_BASE = "http://localhost:3000";
const DOLLAR_TO_COIN_RATE = 10; // 1 $ = 10 coins

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;
    fetchTasks();
  }, [user?.email]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE}/tasks/user/${encodeURIComponent(user.email)}`
      );
      setTasks(data);
    } catch (err) {
      console.error("API Error:", err);
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
      // 1) Delete the task
      await axios.delete(`${API_BASE}/tasks/${id}`);

      // 2) Compute refund in coins
      const requiredWorkers = Number(taskToDelete.required_workers) || 0;
      const payRate = Number(taskToDelete.payable_amount) || 0;
      const refundCoins =
        requiredWorkers * payRate * DOLLAR_TO_COIN_RATE;

      // 3) Fetch the task poster's current coin balance
      const userRes = await axios.get(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`
      );
      const currentCoins = Number(userRes.data.coins) || 0;

      // 4) Update poster's coin balance
      await axios.put(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`,
        { coins: currentCoins + refundCoins }
      );

      // 5) Update local state
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete & refund error:", err);
      alert("Failed to delete task or process refund.");
    }
  };

  const handleUpdate = async (id, updatedFields) => {
    try {
      await axios.put(`${API_BASE}/tasks/${id}`, updatedFields);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updatedFields } : t))
      );
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update task");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading tasks...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error: {error}</p>
    );

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Your Posted Tasks
      </h1>
      <hr className="py-2" />
      <div className="grid grid-cols-1 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    task_title: task.task_title,
    task_detail: task.task_detail,
    submission_info: task.submission_info,
  });

  const handleChange = (e) =>
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, formData);
    setIsModalOpen(false);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-2 flex flex-col lg:flex-row items-center lg:items-start min-h-60 max-h-60 overflow-hidden">
      <figure className="w-full lg:w-5/12 h-full">
        <img
          src={
            task.task_image_url ||
            "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          }
          alt="Task Preview"
          className="object-cover h-full w-full rounded-lg"
        />
      </figure>
      <div className="card-body flex flex-col flex-grow lg:w-7/12 p-2 px-4 h-full flex-wrap gap-0">
        <h2 className="card-title text-lg font-bold">
          {task.task_title}
        </h2>
        <p className="text-sm font-semibold">
          Workers Needed: {task.required_workers}
        </p>
        <p className="text-sm font-semibold">
          Pay Rate: {task.payable_amount}
        </p>
        <p className="text-sm text-gray-600 truncate">
          Completion Deadline: {task.completion_date}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 break-words overflow-hidden">
          {task.task_detail}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 break-words overflow-hidden">
          {task.submission_info}
        </p>
        <p className="text-sm text-gray-600 truncate">
          Submitted by: {task.user_email}
        </p>
        <div className="card-actions justify-start mt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-sm bg-customColor text-white border-customColor rounded-full"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-sm btn-outline border-customColor rounded-full"
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Task</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  name="task_title"
                  value={formData.task_title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Task Detail</label>
                <textarea
                  name="task_detail"
                  value={formData.task_detail}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm">
                  Submission Details
                </label>
                <textarea
                  name="submission_info"
                  value={formData.submission_info}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm rounded-full btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm rounded-full bg-customColor border-customColor"
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