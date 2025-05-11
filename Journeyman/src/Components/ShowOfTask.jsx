import React, { useState, useEffect } from "react";

const ShowOfTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fakeTasks = [
      {
        id: 1,
        task_title: "Watch my YouTube video and comment",
        task_detail: "Leave a meaningful comment and provide a screenshot.",
        required_workers: 100,
        payable_amount: 10,
        completion_date: "2025-05-15",
        submission_info: "Upload a screenshot.",
        task_image_url:
          "https://i.ibb.co.com/sJpBgD8g/rsz-1freestocks-i-poqp6kcoi-unsplash.jpg",
        status: "Top",
      },
      {
        id: 2,
        task_title: "Follow my Instagram page",
        task_detail: "Follow and like 3 recent posts, then provide proof.",
        required_workers: 50,
        payable_amount: 5,
        completion_date: "2025-05-18",
        submission_info: "Screenshot showing you followed.",
        task_image_url:
          "https://i.ibb.co.com/sJpBgD8g/rsz-1freestocks-i-poqp6kcoi-unsplash.jpg",
        status: "New",
      },
      // ...other tasks
    ];

    setTimeout(() => {
      setTasks(fakeTasks);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-5 w-full mx-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="card bg-base-100 shadow-lg relative overflow-hidden flex flex-col md:flex-row w-full max-w-4xl"
        >
          {/* Flipped Triangle Badge */}
          {task.status && (
            <div className="absolute -top-6 left-0 w-24 h-8 bg-red-400 text-white text-xs font-bold flex items-center justify-center -rotate-45 -translate-x-8 translate-y-8">
              {task.status}
            </div>
          )}

          {/* Image */}
          <figure className="w-full md:w-1/3 h-48 md:h-auto">
            <img
              src={task.task_image_url}
              alt="Task Preview"
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Content */}
          <div className="card-body p-4 w-full md:w-2/3">
            <h2 className="card-title text-lg font-semibold">
              {task.task_title}
            </h2>
            <p className="text-sm text-gray-700">{task.task_detail}</p>
            <p className="text-sm">
              <strong>Workers:</strong> {task.required_workers}
            </p>
            <p className="text-sm">
              <strong>Pay:</strong> ${task.payable_amount}
            </p>
            <p className="text-sm">
              <strong>Deadline:</strong> {task.completion_date}
            </p>
            <div className="card-actions justify-start">
              <button className="btn bg-customColor text-white border-customColor rounded-full btn-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowOfTask;