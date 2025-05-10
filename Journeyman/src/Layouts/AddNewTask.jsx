import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider"; // Import AuthContext

const AddNewTask = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user
    const [task, setTask] = useState({
        task_title: "",
        task_detail: "",
        required_workers: "",
        payable_amount: "",
        completion_date: "",
        task_image_url: "",
        submission_info: "",
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            alert("User email is required to submit the task.");
            return;
        }

        const formattedTask = {
            ...task,
            required_workers: parseInt(task.required_workers, 10), 
            payable_amount: parseInt(task.payable_amount, 10),
            completion_date: new Date(task.completion_date).toISOString(),
            user_email: user.email,
            task_image_url: task.task_image_url, // Include image URL
        };

        try {
            const response = await axios.post("http://localhost:3000/tasks", formattedTask, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                alert("Task added successfully!");
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
                alert("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("An error occurred while adding the task.");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen flex items-center justify-center px-6 py-4">
            <div className="max-w-3xl w-full bg-base-100 shadow-2xl rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-400">Add a new task</h1>
                <p className="text-center text-gray-600 mt-2">Define the work details below.</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Task Title</span></label>
                        <input type="text" name="task_title" placeholder="Enter task title" className="input input-bordered w-full text-lg py-3" required value={task.task_title} onChange={handleChange} />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Task Details</span></label>
                        <textarea name="task_detail" placeholder="Enter task details" className="textarea textarea-bordered w-full text-lg py-3 h-28" required value={task.task_detail} onChange={handleChange} />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Required Workers</span></label>
                        <input type="number" name="required_workers" placeholder="Number of workers needed" className="input input-bordered w-full text-lg py-3" required value={task.required_workers} onChange={handleChange} />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Payable Amount</span></label>
                        <input type="number" name="payable_amount" placeholder="Amount per worker" className="input input-bordered w-full text-lg py-3" required value={task.payable_amount} onChange={handleChange} />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Completion Date</span></label>
                        <input type="date" name="completion_date" className="input input-bordered w-full text-lg py-3" required value={task.completion_date} onChange={handleChange} />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Task Image URL</span></label>
                        <input type="text" name="task_image_url" placeholder="Enter image URL" className="input input-bordered w-full text-lg py-3" value={task.task_image_url} onChange={handleChange} />
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text text-lg">Submission Info</span></label>
                        <textarea name="submission_info" placeholder="Describe what needs to be submitted (e.g., screenshot)" className="textarea textarea-bordered w-full text-lg py-3 h-20" required value={task.submission_info} onChange={handleChange} />
                    </div>

                    

                    <div className="flex justify-center items-center">
                        <button className="btn btn-md bg-customColor text-white rounded-full w-8/12 mx-auto hover:scale-105" type="submit">
                            Submit Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewTask;
