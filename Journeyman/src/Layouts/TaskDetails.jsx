import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingState from "../Components/LoadingState";
import { AuthContext } from "../Context/AuthProvider";

const TaskDetails = () => {
  const { id: taskId } = useParams();
  const { userData } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const workerEmail = userData?.email || "";
  const workerName = userData?.displayName || "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/tasks/${taskId}`)
      .then((res) => {
        setTask(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
        setError(err.message || "Failed to load task");
        setLoading(false);
      });
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!submissionDetails.trim()) {
      setSubmitError("Please describe your submission.");
      return;
    }

    const payload = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: workerEmail,
      worker_name: workerName,
      client_email: task.user_email,
      submission_details: submissionDetails,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      setSubmitting(true);
      await axios.post("http://localhost:3000/submissions", payload);

      setSubmitSuccess(true);
      setSubmissionDetails("");
      // Update the UI immediately
      setTask((prev) => ({
        ...prev,
        required_workers: prev.required_workers - 1,
      }));
    } catch (err) {
      console.error("Error submitting:", err);
      setSubmitError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading task: {error}</p>
      </div>
    );

  return (
    <>
    <div>
      <h1 className="text-3xl font-semibold text-center mt-4">Task details</h1>
    </div>
    <hr className=" mt-4"/>
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg">
      
      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-lg">
          <img
            src={
              task.task_image_url ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={task.task_title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
            {task.task_title}
          </h1>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
            <div>
              <dt className="font-semibold">Description</dt>
              <dd className="mt-1">{task.task_detail}</dd>
            </div>
            <div>
              <dt className="font-semibold">Workers Needed</dt>
              <dd className="mt-1">{task.required_workers}</dd>
            </div>
            <div>
              <dt className="font-semibold">Pay Rate</dt>
              <dd className="mt-1">${task.payable_amount}</dd>
            </div>
            <div>
              <dt className="font-semibold">Deadline</dt>
              <dd className="mt-1">{task.completion_date}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-gray-500">
            Posted by <span className="font-medium">{task.user_email}</span>
          </p>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      {/* Submission Form */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Submit Your Work
        </h2>
        {submitSuccess && (
          <p className="mb-4 text-green-600">
            Submission successful! Your work is pending review.
          </p>
        )}
        {submitError && (
          <p className="mb-4 text-red-500">Error: {submitError}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <textarea
            id="submissionDetails"
            className="col-span-1 md:col-span-2 p-4 h-40 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-customColor"
            placeholder="Describe your submission..."
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            disabled={submitting}
            required
          />
          <button
            type="submit"
            className="md:col-span-1 bg-customColor text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 hover:bg-customColor-dark disabled:opacity-50 disabled:cursor-not-allowed "
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Work"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default TaskDetails;