import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { SiPaloaltonetworks } from "react-icons/si";
const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar py-1 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolling ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-transparent"
    }`}>
      <div className="navbar rounded-lg px-6 py-1 max-w-[1500px] mx-auto text-gray-500">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <div>
            <Link className="text-xl">
              <div className="flex items-center">
              <SiPaloaltonetworks className="text-customColor text-2xl"/>
                <div className="text-2xl font-bold text-customColor">
                  Journey<span className="text-gray-300">man</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex gap-6"></div>
        <div className="navbar-end space-x-8">
          {user ? (
            <div className="flex gap-4 items-center">

              <Link to="/" className="text-lg border-t-2 border-customColor text-customColor">Home</Link>
              <Link to="/dashboard" className="text-lg  ">Dashboard</Link>
              <Link className="text-lg" onClick={logOut}>Sign out</Link>
              <button>
                <div className="flex items-center gap-1">
                  <img src="https://i.ibb.co.com/GQB1XwSm/game-coin.png" className="h-8" /> 0$
                </div>
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
              <Link to="/login" className="btn btn-ghost btn-sm text-customColor border border-customColor rounded-full">Sign in</Link>
            </div>
          )}
          <a href="https://github.com/Mamunfx/Journeyman" target="_blank"
            className="btn rounded-full btn-sm btn-outline text-gray-500 hover:bg-customColor hover:text-white hover:border-customColor">
            Join as developer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
