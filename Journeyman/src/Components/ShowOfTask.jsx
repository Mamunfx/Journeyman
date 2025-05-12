import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          "https://i.ibb.co.com/xq8Ydw4D/e8583588-327c-45e3-9b1e-d3944852b738.jpg",
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
          "https://i.ibb.co.com/Q7DpycJ0/photo-1611162616305-c69b3fa7fbe0.jpg",
        status: "New",
      },
      {
        id: 3,
        task_title: "Join my Discord server",
        task_detail: "Join and send a screenshot of your membership.",
        required_workers: 30,
        payable_amount: 3,
        completion_date: "2025-05-20",
        submission_info: "Screenshot showing you joined.",
        task_image_url:
          "https://i.ibb.co.com/NgRcdH1N/images.jpg",
        status: "Top",
      },
      {
        id: 4,
        task_title: "Share my post on Facebook",
        task_detail: "Share and provide a screenshot of the share.",
        required_workers: 20,
        payable_amount: 2,
        completion_date: "2025-05-22",
        submission_info: "Screenshot showing you shared.",
        task_image_url:
          "https://i.ibb.co.com/7DF581r/a1c4a9d9-a660-40a3-8459-8559e362ad10.jpg",
        status: "New",
      },
      {
        id: 5,
        task_title: "Tweet about my product",
        task_detail: "Tweet and provide a screenshot of the tweet.",
        required_workers: 10,
        payable_amount: 1,
        completion_date: "2025-05-25",
        submission_info: "Screenshot showing you tweeted.",
        task_image_url:
          "https://i.ibb.co.com/sJpBgD8g/rsz-1freestocks-i-poqp6kcoi-unsplash.jpg",
        status: "Top",
      },
      {
        id: 6,
        task_title: "Like my Facebook page",
        task_detail: "Like and provide a screenshot of the like.",
        required_workers: 15,
        payable_amount: 4,
        completion_date: "2025-05-28",
        submission_info: "Screenshot showing you liked.",
        task_image_url:
          "https://i.ibb.co.com/d4P6HkWR/Like-icon.jpg",
        status: "New",
      },
    
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

          {task.status && (
            <div className="absolute -top-6 left-0 w-24 h-8 bg-red-400 text-white text-xs font-bold flex items-center justify-center -rotate-45 -translate-x-8 translate-y-8">
              {task.status}
            </div>
          )}


          <figure className="w-full md:w-1/3 h-48 md:h-auto">
            <img
              src={task.task_image_url}
              alt="Task Preview"
              className="w-full h-60 object-cover"
            />
          </figure>

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
              <Link to="/dashboard"><button className="btn bg-customColor text-white border-customColor rounded-full btn-sm">
                View Details
              </button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowOfTask;