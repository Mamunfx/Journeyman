import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../Context/AuthProvider";
import { SiPaloaltonetworks } from "react-icons/si";

const Dashboard = () => {
  const { logOut, user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || "");
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleUpdate = () => {
    const updatedInfo = { displayName: name, photoURL: profilePicture };
    updateUserProfile(updatedInfo);
    alert("Profile updates successfully");
    setEditing(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">

      <div className="w-full lg:w-1/4 bg-gray-500 p-4">

        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/xgb3fnn/Arsenal-removebg-preview.png"
              alt=""
              className="h-16"
            />
            <Link className="text-3xl ml-4 font-bold" to="/">
            <div className="flex items-center">
              <SiPaloaltonetworks className="text-customColor text-2xl"/>
                <div className="text-2xl font-bold text-customColor">
                  Journey<span className="text-gray-300">man</span>
                </div>
              </div>
            </Link>
          </div>
          <button
            className="text-xl px-4 py-2 bg-customColor rounded-lg hover:bg-green-200 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close Menu" : <GiHamburgerMenu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="space-y-4 my-8 lg:hidden">
            <Link
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              to="/"
            >
              Home
            </Link>
            
            <button
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </nav>
        )}


        <div className="hidden lg:block">
          <div className="flex items-center">
            
            <Link className="text-3xl ml-4 font-bold" to="/">
            <div className="flex items-center">
              <SiPaloaltonetworks className="text-customColor text-2xl"/>
                <div className="text-2xl font-bold text-customColor">
                  Journey<span className="text-gray-300">man</span>
                </div>
              </div>
            </Link>
          </div>
          <nav className="space-y-4 my-8">
            <Link
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              to="/"
            >
              Home
            </Link>
           
            <button
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>


      <div className="flex-1 p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-14 text-center">
          Welcome to Your Dashboard
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            Profile Information
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-48 h-64 object-cover shadow-md border-2 border-gray-200 rounded-lg"
              />
            </div>

            <div className="flex-grow space-y-4">
              <p className="text-gray-700 text-lg">
                <span className="font-medium text-gray-900">Name:</span>{" "}
                {user?.displayName || "Not provided"}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                {user?.email || "Not provided"}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium text-gray-900">
                  Phone Number:
                </span>{" "}
                {user?.phoneNumber || "Not provided"}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium text-gray-900">Address:</span>{" "}
                {user?.address || "Not provided"}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium text-gray-900">
                  Date of Birth:
                </span>{" "}
                {user?.dateOfBirth || "Not provided"}
              </p>
            </div>
          </div>
        </div>


        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-10">Edit Profile :</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 ">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-customColor font-semibold rounded-lg  text-white"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="ml-4 px-4 py-2 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
