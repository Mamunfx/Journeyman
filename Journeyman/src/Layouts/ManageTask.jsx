import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks directly with full URL
  useEffect(() => {
    axios
      .get("https://journeyman-server-sigma.vercel.app/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Could not load tasks");
        setLoading(false);
      });
  }, []);

  // Delete a task by ID
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    axios
      .delete(`https://journeyman-server-sigma.vercel.app/tasks/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        alert("Failed to delete task");
      });
  };

  if (loading) return <p className="text-center mt-4">Loading tasks…</p>;
  if (error)   return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="mx-4">
      <h1 className="text-gray-400 text-3xl text-center my-3">
        Manage all the tasks
      </h1>
      <hr className="my-4" />

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-sm btn-outline rounded-full border-customColor text-gray-400 hover:bg-customColor"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTask;