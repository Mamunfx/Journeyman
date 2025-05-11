import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingState from "../Components/LoadingState";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        // Keep only tasks with required_workers > 0
        const validTasks = response.data.filter(
          (task) => task.required_workers > 0
        );
        setTasks(validTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Calculate pagination based on filtered tasks
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const displayedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <LoadingState />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="px-2">
      <h1 className="text-3xl font-bold mb-2 text-center">All Tasks</h1>
      <hr className="py-2" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {displayedTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found!</p>
        ) : (
          displayedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>

      <div className="join mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`join-item btn btn-sm ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="card bg-base-100 shadow-md max-w-xs mx-auto">
      <figure className="h-32 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={
            task.task_image_url ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={task.task_title}
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title text-base font-bold">
          {task.task_title}
          <div className="badge border-customColor text-xs ml-2">NEW</div>
        </h2>
        <p className="text-xs font-semibold">
          Workers Needed: {task.required_workers}
        </p>
        <p className="text-xs font-semibold">
          Pay Rate: {task.payable_amount}
        </p>
        <p className="text-xs text-gray-600 truncate">
          Completion Deadline: {task.completion_date}
        </p>
        <p className="text-xs text-gray-600 line-clamp-2 break-words">
          {task.task_detail}
        </p>
        <p className="text-xs text-gray-600 truncate">
          Submitted by: {task.user_email}
        </p>
        <div className="card-actions justify-center my-2">
          <Link
            to={`/dashboard/taskDetails/${task._id}`}
            className="btn btn-xs rounded-full bg-customColor border-customColor text-white"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;