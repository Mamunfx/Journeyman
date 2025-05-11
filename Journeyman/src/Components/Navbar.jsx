import React, { useContext, useState, useEffect } from "react";
import axios from "axios"
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { SiPaloaltonetworks } from "react-icons/si";
const Navbar = () => {
  const location=useLocation();
  const { logOut, user } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const [coin ,setCoin]=useState(0);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(`http://localhost:3000/users/${user.email}`);
          
          if (res.data && res.data.coins !== undefined) {
            setCoin(res.data.coins);
          } else {
            console.warn("Coins field missing in response!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, [user?.email]);
  


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

        <div className="navbar-end space-x-6">
          {user ? (
            <div className="flex gap-4 items-center">

              <Link to="/" className="text-lg border-t-2 border-customColor text-customColor">Home</Link>
              <Link to="/dashboard" className="text-lg ">Dashboard</Link>
              <Link className="text-lg" onClick={logOut}>Sign out</Link>
              <button>
                <div className="flex items-center gap-1">
                  <img src="https://i.ibb.co.com/GQB1XwSm/game-coin.png" className="h-8" /> <p>{coin}$</p>
                </div>
              </button>

              <Link className="items-center" to="/dashboard">
              <div className="relative group inline-block"> 
        <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full p-1 border" /> 
        <div className="absolute top-1/2 right-full transform -translate-y-1/2 mr-2 px-2 py-1 bg-customColor text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"> 
            {user.displayName} 
            </div> 
            </div>
            </Link>

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
