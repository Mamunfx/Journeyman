import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { SiPaloaltonetworks } from "react-icons/si";

const Navbar = () => {
  const location = useLocation();
  const { logOut, user } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/users/${user.email}`
        );
        if (res.data?.coins !== undefined) {
          setCoin(res.data.coins);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, [user?.email]);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`navbar py-1 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolling
          ? "backdrop-blur-md bg-white/60 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="navbar px-6 max-w-[1500px] mx-auto text-gray-500">
        {/* Mobile: dropdown + logo */}
        <div className="navbar-start flex items-center">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? (
                <>
                <li>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-6 h-6 rounded-full border"
                      />
                      {user.displayName}
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Sign out</button>
                  </li>
                  
                  
                </>
              ) : (
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
              )}
              <li>
                <a
                  href="https://github.com/Mamunfx/Journeyman"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join as developer
                </a>
              </li>
            </ul>
          </div>

          <Link to="/" className="flex items-center">
            <SiPaloaltonetworks className="text-customColor text-2xl" />
            <span className="ml-2 text-2xl font-bold text-customColor">
              Journey
              <span className="text-gray-300">man</span>
            </span>
          </Link>
        </div>

        {/* Desktop / tablet nav links */}
        <div className="navbar-end hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/"
                className={`text-lg border-t-2 ${
                  location.pathname === "/" ? "border-customColor text-customColor" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`text-lg ${
                  location.pathname.startsWith("/dashboard")
                    ? "text-customColor"
                    : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={logOut}
                className="text-lg hover:text-customColor transition"
              >
                Sign out
              </button>

              <button className="flex items-center gap-1">
                <img
                  src="https://i.ibb.co.com/GQB1XwSm/game-coin.png"
                  className="h-6"
                  alt="coin"
                />
                <span>{coin}</span>
              </button>

              <Link to="/dashboard" className="relative group inline-block">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full p-1 border"
                />
                <div className="absolute top-1/2 right-full transform -translate-y-1/2 mr-2 px-2 py-1 bg-customColor text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.displayName}
                </div>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-ghost btn-sm text-customColor border border-customColor rounded-full"
            >
              Sign in
            </Link>
          )}
          <a
            href="https://github.com/Mamunfx/Journeyman"
            target="_blank"
            rel="noopener noreferrer"
            className="btn rounded-full btn-sm btn-outline text-gray-500 hover:bg-customColor hover:text-white hover:border-customColor"
          >
            Join as developer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;