import React, { useState } from "react";
import { FaTasks, FaPoll, FaPaintBrush, FaPenNib } from "react-icons/fa";

const jobCategories = [
  {
    icon: <FaTasks className="text-6xl text-gray-700" />,
    title: "Data Entry",
    description: "Complete simple data entry tasks and earn rewards.",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    icon: <FaPoll className="text-6xl text-gray-700" />,
    title: "Surveys & Feedback",
    description: "Share opinions and get paid for participating in surveys.",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    icon: <FaPaintBrush className="text-6xl text-gray-700" />,
    title: "Graphic Design",
    description: "Create logos, banners, and more for various clients.",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  {
    icon: <FaPenNib className="text-6xl text-gray-700" />,
    title: "Content Writing",
    description: "Write blog posts, articles, and product descriptions.",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
];

const JobDiscovery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobCategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jobCategories.length) % jobCategories.length);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Section Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center">
        
        {/* Left Section - Title & Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Discover a Platform That Always Has the Right Job for You
          </h2>
          <p className="text-gray-600">
            Explore diverse tasks, unlock earning potential, and boost your productivity. Join a thriving community today.
          </p>
          {/* Navigation Arrows Beside Title */}
          <div className="flex gap-3">
            <button onClick={prevSlide} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">◀</button>
            <button onClick={nextSlide} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">▶</button>
          </div>
        </div>

        {/* Right Section - Icon Display */}
        <div className="flex justify-center">
          {jobCategories[currentIndex].icon}
        </div>
      </div>

      {/* Card Section Below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {jobCategories.map((job, index) => (
          <div key={index} className="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
              <img src={job.image} alt={job.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{job.title}</h2>
              <p>{job.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDiscovery;
