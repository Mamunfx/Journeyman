import React, { useState } from "react";
import ShowOfTask from "./ShowOfTask";
import { IoSearchSharp } from "react-icons/io5";

const RecentJobs = () => {
  const categories = ["All", "Social Media", "Surveys", "Website Reviews", "App Testing", "Gaming", "Others"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const paymentMethods = ["PayPal", "Bank Transfer", "Crypto", "Gift Cards"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(10);

  // Toggle function for checkboxes
  const handleCheckboxChange = (type, value) => {
    if (type === "level") {
      setSelectedLevels(prev =>
        prev.includes(value) ? prev.filter(l => l !== value) : [...prev, value]
      );
    } else if (type === "payment") {
      setSelectedPaymentMethods(prev =>
        prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
      );
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center my-10">Recent Jobs</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-5 w-full mx-auto">
      {/* Left Section - Task Cards */}
      <div className="w-full md:w-2/3">
        <ShowOfTask />
      </div>

      {/* Right Section - Category & Filters */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Categories</h2>

        {/* Search Bar */}
        <div className="flex items-center bg-white p-2 rounded-md shadow-sm mb-4">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full outline-none px-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-gray-500 px-2"><IoSearchSharp /></span>
        </div>

        {/* Category Filters */}
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`p-2 bg-white rounded-md shadow-sm hover:bg-gray-200 transition cursor-pointer ${
                selectedCategory === category ? " " : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* Price Range Slider */}
        <div className="mt-6">
          <label className="text-sm font-semibold">Sort by Price: ${priceRange}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full mt-2 accent-[rgb(102,179,179)]"
          />
          <p className="text-center text-sm mt-1">Showing tasks up to ${priceRange}</p>
        </div>

        {/* Level Filters */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Filter by Level:</h3>
          {levels.map((level, index) => (
            <label key={index} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedLevels.includes(level)}
                onChange={() => handleCheckboxChange("level", level)}
                className="accent-[rgb(102,179,179)]"
              />
              {level}
            </label>
          ))}
        </div>

        {/* Payment Method Filters */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Payment Methods:</h3>
          {paymentMethods.map((method, index) => (
            <label key={index} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedPaymentMethods.includes(method)}
                onChange={() => handleCheckboxChange("payment", method)}
                className="accent-[rgb(102,179,179)]"
              />
              {method}
            </label>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecentJobs;
