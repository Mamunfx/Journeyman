import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const API_BASE = "https://journeyman-server-sigma.vercel.app";
const DOLLAR_TO_COIN_RATE = 10; 

export default function AddNewTask() {
  const { user, setUser, notify, notifyError } = useContext(AuthContext);
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


  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };


  const uploadToImgBB = async (imageFile) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const form = new FormData();
    form.append("image", imageFile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: form }
    );
    const data = await res.json();
    if (!data.success) {
      throw new Error("Image upload failed");
    }
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      notifyError("You must be logged in to add a task.");
      return;
    }

    const requiredWorkers = Number(task.required_workers);
    const payRateUSD = Number(task.payable_amount);
    if (
      !Number.isFinite(requiredWorkers) ||
      !Number.isFinite(payRateUSD) ||
      requiredWorkers <= 0 ||
      payRateUSD <= 0
    ) {
      notifyError("Please enter valid positive numbers for workers and pay rate.");
      return;
    }

    const totalCostCoins =
      requiredWorkers * payRateUSD * DOLLAR_TO_COIN_RATE;

    let currentCoins;
    try {
      const userRes = await axios.get(
        `${API_BASE}/users/${encodeURIComponent(user.email)}`
      );
      currentCoins = Number(userRes.data.coins) || 0;
    } catch (err) {
      notifyError("Unable to verify your coin balance. Try again later.");
      return;
    }

    if (currentCoins < totalCostCoins) {
      notifyError(
        `Insufficient coins. You have ${currentCoins}, but need ${totalCostCoins}.`
      );
      navigate("/purchase");
      return;
    }

    let imageUrl = task.task_image_url;
    if (file) {
      setUploading(true);
      try {
        imageUrl = await uploadToImgBB(file);
      } catch (err) {
        console.error(err);
        notifyError("Image upload failed. Please try again.");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    const payload = {
      task_title: task.task_title,
      task_detail: task.task_detail,
      required_workers: requiredWorkers,
      payable_amount: payRateUSD,
      completion_date: new Date(task.completion_date).toISOString(),
      task_image_url: imageUrl,
      submission_info: task.submission_info,
      user_email: user.email,
    };

    try {
      const createRes = await axios.post(
        `${API_BASE}/tasks`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (createRes.status >= 200 && createRes.status < 300) {
        const newBalance = currentCoins - totalCostCoins;
        await axios.put(
          `${API_BASE}/users/${encodeURIComponent(user.email)}`,
          { coins: newBalance }
        );

        if (setUser) {
          setUser({ ...user, coins: newBalance });
        }

        notify(
          `Task added! Coins deducted: ${totalCostCoins}. New balance is: ${newBalance}`
        );

        setTask({
          task_title: "",
          task_detail: "",
          required_workers: "",
          payable_amount: "",
          completion_date: "",
          task_image_url: "",
          submission_info: "",
        });
        setFile(null);
        setPreview("");
      } else {
        notifyError("Failed to add task. Try again.");
      }
    } catch (err) {
      console.error(err);
      notifyError("An error occurred. Please check console for details.");
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
                <span className="label-text text-lg">Task Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input input-bordered w-full py-2 text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-customColor
                           hover:file:bg-blue-100"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md mt-2"
                />
              )}
            </div>
          </div>


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


          <div className="flex justify-center">
            <button
              type="submit"
              disabled={uploading}
              className="btn btn-md bg-customColor text-white rounded-full w-8/12 hover:scale-105 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Submit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}