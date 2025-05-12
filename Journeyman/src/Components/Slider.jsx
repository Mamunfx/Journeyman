import React from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto my-16 ">
      <div className="carousel w-full">

        {/* Slide 1 - Worker Role */}
        <div id="item1" className="carousel-item w-full">
          <div className="hero min-h-[70vh] bg-[url('https://i.ibb.co/sdRBBJLG/Purple-white-business-profile-presentation-page-0001.jpg')] bg-cover bg-center bg-no-repeat dark:bg-gray-900 py-16">
            <div className="hero-content flex flex-col md:flex-row flex-wrap gap-8 px-4 sm:px-8 w-full justify-start text-2xl mb-28">
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h1 className="text-lg text-customColor">Manage Efficiently</h1>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 md:mt-0 text-gray-500">
                  Keep Everything Running Smoothly
                </h1>
                <p className="py-4 md:py-6 w-full sm:w-4/5 text-gray-500">
                  Oversee transactions, resolve disputes, and optimize workflow effortlessly.
                </p>
                <Link
                  to="/dashboard"
                  className="btn btn-sm rounded-full bg-customColor text-white"
                >
                  Explore more
                </Link>
              </div>
            </div>
          </div>
        </div>
        

        {/* Slide 2 - Buyer Role */}
        <div id="item2" className="carousel-item w-full">
        <div className="hero min-h-[70vh] bg-[url('https://i.ibb.co/sdRBBJLG/Purple-white-business-profile-presentation-page-0001.jpg')] bg-cover bg-center bg-no-repeat dark:bg-gray-900 py-16">
          <div className="hero-content flex flex-col md:flex-row flex-wrap gap-8 px-4 sm:px-8 text-2xl w-full ">
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h1 className="text-lg text-customColor">Lowest price</h1>
                <h1 className="text-3xl md:text-6xl font-bold mt-4 md:mt-0 text-gray-500">
                  Get Your Tasks Done Seamlessly
                </h1>
                <p className="py-4 md:py-6 w-full sm:w-4/5 text-gray-500">
                  Find skilled professionals and enjoy fast, high-quality work completion.
                </p>
                <Link
                  to="/dashboard"
                  className="btn btn-sm rounded-full bg-customColor text-white"
                >
                  Start Hiring
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="item3" className="carousel-item w-full">
          <div className="hero min-h-[70vh] bg-[url('https://i.ibb.co/sdRBBJLG/Purple-white-business-profile-presentation-page-0001.jpg')] bg-cover bg-center bg-no-repeat dark:bg-gray-900 py-16">
          <div className="hero-content flex flex-col md:flex-row flex-wrap gap-8 px-4 sm:px-8 text-2xl w-full ">
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h1 className="text-lg text-customColor">Best Offers</h1>
                <h1 className="text-3xl md:text-6xl font-bold mt-4 md:mt-0 text-gray-500">
                  Get best offering for you tasks
                </h1>
                <p className="py-4 md:py-6 w-full sm:w-4/5 text-gray-500">
                  Find skilled professionals and enjoy fast, high-quality work completion.
                </p>
                <Link
                  to="/dashboard"
                  className="btn btn-sm rounded-full bg-customColor text-white"
                >
                  Start tasks
                </Link>
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
