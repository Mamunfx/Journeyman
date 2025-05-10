import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/tasks/${user.email}`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <p className="text-center text-lg">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className=" px-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Posted Tasks</h1>
      <hr className="py-2" />
      <div className="grid grid-cols-1 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found!</p>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
    return (
      <div className="card bg-base-100 shadow-xl p-2 flex flex-col lg:flex-row items-center lg:items-start min-h-60 max-h-60 overflow-hidden">
        <figure className="w-full lg:w-5/12 h-full">
          <img
            src={task.task_image_url || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
            alt="Task Preview"
            className="object-cover h-full w-full rounded-lg"
          />
        </figure>
        <div className="card-body flex flex-col flex-grow lg:w-7/12 p-2 px-4 h-full flex-wrap gap-0">
          <h2 className="card-title text-lg font-bold">{task.task_title}</h2>
          <p className="text-sm font-semibold">Workers Needed: {task.required_workers}</p>
          <p className="text-sm font-semibold">Pay Rate: {task.payable_amount}</p>
          <p className="text-sm text-gray-600 overflow-hidden whitespace-normal truncate">
            Completion Deadline: {task.completion_date}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 break-words overflow-hidden">
            {task.task_detail}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 break-words overflow-hidden">
            {task.submission_info}
          </p>
          <p className="text-sm text-gray-600 truncate">Submitted by: {task.user_email}</p>
          <div className="card-actions justify-start mt-2">
            <button className="btn btn-sm bg-customColor text-white border-customColor rounded-full">
            Update
            </button>
            <button className="btn btn-sm btn-outline  border-customColor rounded-full">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default MyTasks;
