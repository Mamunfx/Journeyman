import React from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <div className="my-24">
      <div className="carousel w-full">
        {/* Slide 1 - Worker Role */}
        <div id="item1" className="carousel-item w-full">
          <div className="hero dark:bg-gray-900 py-16">
            <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 p-4">
              <div className="w-full lg:w-1/2">
                <img
                  src="https://i.ibb.co.com/v6Yq17cG/rsz-1white-green-simple-and-professional-business-pitch-deck-presentation-page-0010.jpg"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  alt="Worker Role"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <h1 className="text-lg text-customColor">Highest Rewards</h1>
                <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
                  Earn Coin Effortlessly
                </h1>
                <p className="py-4 lg:py-6 w-4/5">
                  Search your dream jobs and find more paying task than other platform . Complete micro tasks, submit for review, and withdraw earnings seamlessly.
                </p>
                <Link to="/WorkerDashboard" className="btn btn-sm rounded-full  bg-customColor text-white">Start Earning</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Buyer Role */}
        <div id="item2" className="carousel-item w-full">
          <div className="hero dark:bg-gray-900 py-16">
            <div className="hero-content flex flex-col lg:flex-row gap-8 p-4">
              <div className="w-full lg:w-1/2">
                <img
                  src="https://i.ibb.co.com/KpKsJxw6/rsz-white-green-simple-and-professional-business-pitch-deck-presentation-page-0007.jpg"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  alt="Buyer Role"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <h1 className="text-lg text-customColor">Buyer Features</h1>
                <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
                  Manage Your Task Needs
                </h1>
                <p className="py-4 lg:py-6 w-4/5">
                 Get the most talented people around the world to finish you task ! Find the cheapest possible option to complete your jorney with journeyman. Create tasks, review submissions, and pay workers effortlessly.
                </p>
                <Link to="/TaskManagement" className="btn btn-sm rounded-full  bg-customColor text-white ">Create a Task</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 - Admin Role */}
        <div id="item3" className="carousel-item w-full">
          <div className="hero dark:bg-gray-900 py-16">
            <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 p-4">
              <div className="w-full lg:w-1/2">
                <img
                  src="https://i.ibb.co.com/nRHX81h/successful-young-businesswoman-standing-office-presenting.jpg"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                  alt="Admin Role"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <h1 className="text-lg text-customColor">Admin Panel</h1>
                <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
                  Oversee Platform Operations
                </h1>
                <p className="py-4 lg:py-6 w-4/5">
                  We ensure our user the best service and  Manage users, review reports, and maintain system integrity with cuttin edge technologies and robust web security method.
                </p>
                <Link to="/AdminPanel" className="btn btn-sm rounded-full  bg-customColor text-white ">Go to Admin Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full justify-center gap-2 py-4">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
      </div>
    </div>
  );
};

export default Slider;
