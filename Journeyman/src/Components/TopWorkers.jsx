import React from "react";

const topWorkers = [
  {
    id: 1,
    name: "John Doe",
    coins: 9500,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Jane Smith",
    coins: 8700,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Mark Johnson",
    coins: 8100,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Emily Davis",
    coins: 7800,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Michael Brown",
    coins: 7400,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    coins: 7200,
    image: "https://i.ibb.co.com/99wBGrqG/journeyman-high-resolution-logo-removebg-preview.png",
    rating: 4.2,
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-xl">★</span>
      ))}
      {hasHalfStar && <span className="text-xl">☆</span>}
    </div>
  );
};

const TopWorkers = () => {
  return (
    <div className="max-w-[1366px] mx-auto p-6 w-11/12">
      <h2 className="text-3xl font-bold text-gray-500 text-center mb-12">
        Top Workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topWorkers.map((worker) => (
          <div key={worker.id} className="card bg-base-100 shadow-xl  transition-transform transform hover:scale-105 hover:shadow-2xl">
            <figure>
              <img src={worker.image} alt={worker.name} className="w-full h-48 object-cover rounded-t-lg"/>
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {worker.name}
                <div className="badge text-customColor border border-customColor">Top Worker</div>
              </h2>
              <p className="text-lg font-medium">Coins: {worker.coins}</p>
              <div className="flex items-center">
                <StarRating rating={worker.rating} />
                <span className="ml-2 text-gray-600">{worker.rating}</span>
              </div>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">Micro Tasks</div>
                <div className="badge badge-outline">Data entry</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorkers;
