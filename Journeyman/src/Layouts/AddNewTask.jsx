import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const API_BASE = "https://journeyman-server-sigma.vercel.app";
const DOLLAR_TO_COIN_RATE = 10; // 1 USD = 10 coins

const AddNewTask = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    task_image_url: "",
    submission_info: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user?.email) {
      alert("You must be logged in to add a task.");
      return;
    }

    // 1) Parse inputs
    const requiredWorkers = Number(task.required_workers);
    const payRateUSD = Number(task.payable_amount);
    if (
      !Number.isFinite(requiredWorkers) ||
      !Number.isFinite(payRateUSD) ||
      requiredWorkers <= 0 ||
      payRateUSD <= 0
    ) {
      alert("Please enter valid positive numbers for workers and pay rate.");
      return;
    }

    // 2) Calculate total cost in coins
    //    same formula as refund in MyTasks: workers * USD * rate
    const totalCostCoins = requiredWorkers * payRateUSD * DOLLAR_TO_COIN_RATE;

    // 3) Get fresh coin balance from server
    let currentCoins;
    try {
      const userRes = await axios.get(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`
      );
      currentCoins = Number(userRes.data.coins) || 0;
    } catch (err) {
      console.error("Failed to fetch user balance:", err);
      alert("Unable to verify your coin balance. Try again later.");
      return;
    }

    // 4) Check balance
    if (currentCoins < totalCostCoins) {
      alert(
        `Insufficient coins. You have ${currentCoins}, but need ${totalCostCoins}.`
      );
      navigate("/purchase");
      return;
    }

    // 5) Build task payload
    const payload = {
      task_title: task.task_title,
      task_detail: task.task_detail,
      required_workers: requiredWorkers,
      payable_amount: payRateUSD,
      completion_date: new Date(task.completion_date).toISOString(),
      task_image_url: task.task_image_url,
      submission_info: task.submission_info,
      user_email: user.email,
    };

    // 6) Create task and then deduct coins
    try {
      const createRes = await axios.post(
        `${API_BASE}/tasks`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (createRes.status >= 200 && createRes.status < 300) {
        const newBalance = currentCoins - totalCostCoins;
        // Mirror MyTasks refund pattern but subtract instead
        await axios.put(
          `${API_BASE}/users/${encodeURIComponent(user.email)}`,
          { coins: newBalance }
        );

        // Update context so UI shows new balance immediately
        if (setUser) {
          setUser({ ...user, coins: newBalance });
        }

        alert(`Task added! Coins deducted: ${totalCostCoins}. New balance: ${newBalance}`);
        // Reset form
        setTask({
          task_title: "",
          task_detail: "",
          required_workers: "",
          payable_amount: "",
          completion_date: "",
          task_image_url: "",
          submission_info: "",
        });
      } else {
        console.error("Task creation failed:", createRes);
        alert("Failed to add task. Try again.");
      }
    } catch (err) {
      console.error("Error during task creation or coin deduction:", err);
      alert("An error occurred. Please check console for details.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center px-6 py-4">
      <div className="max-w-3xl w-full bg-base-100 shadow-2xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-400">
          Add a New Task
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Define the work details below.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Task Title</span>
            </label>
            <input
              type="text"
              name="task_title"
              placeholder="Enter task title"
              className="input input-bordered w-full text-lg py-3"
              required
              value={task.task_title}
              onChange={handleChange}
            />
          </div>

          {/* Task Details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Task Details</span>
            </label>
            <textarea
              name="task_detail"
              placeholder="Enter task details"
              className="textarea textarea-bordered w-full text-lg py-3 h-28"
              required
              value={task.task_detail}
              onChange={handleChange}
            />
          </div>

          {/* Workers & Rate */}
          <div className="form-control grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text text-lg">Required Workers</span>
              </label>
              <input
                type="number"
                name="required_workers"
                placeholder="Number of workers"
                className="input input-bordered w-full text-lg py-3"
                required
                value={task.required_workers}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-lg">
                  Payable Amount (USD)
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                name="payable_amount"
                placeholder="Amount per worker"
                className="input input-bordered w-full text-lg py-3"
                required
                value={task.payable_amount}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                (1 USD = {DOLLAR_TO_COIN_RATE} coins)
              </p>
            </div>
          </div>

          {/* Date & Image */}
          <div className="form-control grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text text-lg">Completion Date</span>
              </label>
              <input
                type="date"
                name="completion_date"
                className="input input-bordered w-full text-lg py-3"
                required
                value={task.completion_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-lg">Task Image URL</span>
              </label>
              <input
                type="text"
                name="task_image_url"
                placeholder="Enter image URL"
                className="input input-bordered w-full text-lg py-3"
                value={task.task_image_url}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submission Info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Submission Info</span>
            </label>
            <textarea
              name="submission_info"
              placeholder="Describe what needs to be submitted"
              className="textarea textarea-bordered w-full text-lg py-3 h-20"
              required
              value={task.submission_info}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-md bg-customColor text-white rounded-full w-8/12 hover:scale-105"
            >
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;