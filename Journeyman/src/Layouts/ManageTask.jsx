import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const API_BASE = 'https://journeyman-server-sigma.vercel.app';
const DOLLAR_TO_COIN_RATE = 10;

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notify, notifyError } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_BASE}/tasks`)
      .then(({ data }) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load tasks');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (task) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      // 2) Compute how many coins to refund
      const workers = Number(task.required_workers) || 0;
      const rate   = Number(task.payable_amount)  || 0;
      const refund = workers * rate * DOLLAR_TO_COIN_RATE;

      if (refund > 0 && task.user_email) {
        // 3) Fetch current coin balance for submitter
        const userRes = await axios.get(
          `${API_BASE}/users/${encodeURIComponent(task.user_email)}`
        );
        const currentCoins = Number(userRes.data.coins) || 0;

        // 4) Update submitter's coin balance
        await axios.put(
          `${API_BASE}/users/${encodeURIComponent(task.user_email)}`,
          { coins: currentCoins + refund }
        );
      }
      // 1) Delete the task on server
      await axios.delete(`${API_BASE}/tasks/${task._id}`)

      // 5) Update UI and notify
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      notify(`Deleted task and refunded ${refund} coins`);
    } catch (err) {
      console.error('Delete & refund error:', err);
      notifyError('Failed to delete task or process refund.');
    }
  };

  if (loading) return <p className="text-center mt-4">Loading tasks…</p>;
  if (error)
    return <p className="text-center text-red-500 mt-4">{error}</p>;

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
                <th>Pay Rate ($)</th>
                <th>Workers</th>
                <th>Submitter</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>{task.payable_amount}</td>
                  <td>{task.required_workers}</td>
                  <td>{task.user_email}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(task)}
                      className="btn btn-sm btn-outline rounded-full border-customColor text-gray-400
                       hover:bg-customColor"
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