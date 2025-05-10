import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Correct import
import { GiHamburgerMenu } from "react-icons/gi";
import { SiPaloaltonetworks } from "react-icons/si";
import Profile from "./Profile"; // Import Profile component
import { AuthContext } from "../Context/AuthProvider";

const Dashboard = () => {
  const { logOut, user, updateUserProfile, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUpdate = (updatedInfo) => {
    updateUserProfile(updatedInfo);
    alert("Profile updated successfully");
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
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-gray-500 p-4">
        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center">
            
            <Link className="text-3xl ml-4 font-bold" to="/">
              <div className="flex items-center">
                <SiPaloaltonetworks className="text-customColor text-2xl" />
                <div className="text-2xl font-bold text-customColor">
                  Journey<span className="text-gray-300">man</span>
                </div>
              </div>
            </Link>
          </div>
          <button
            className="text-xl px-4 py-2 bg-customColor rounded-lg hover:bg-customColor text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close Menu" : <GiHamburgerMenu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="space-y-4 my-8 lg:hidden">
            <Link
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              to="/dashboard"
            >
              Profile
            </Link>

            {userData?.role === "admin" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/adminHome"
                >
                  Admin's home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageUser"
                >
                  Manage Users
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageTask"
                >
                  Manage Tasks
                </Link>
              </>
            )}

            {userData?.role === "Buyer" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/buyerHome"
                >
                  Buyer's home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/addNewTask"
                >
                  Add new task
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/myTasks"
                >
                  My Tasks
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allPayments"
                >
                  All payments
                </Link>
              </>
            )}

            {userData?.role === "worker"  && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/workerHome"
                >
                  Worker's Home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allTasks"
                >
                  All Tasks
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/mySubmissions"
                >
                  My Submissions
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/withDrawls"
                >
                  Withdrawals
                </Link>
              </>
            )}

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
                <SiPaloaltonetworks className="text-customColor text-2xl" />
                <div className="text-2xl font-bold text-customColor">
                  Journey<span className="text-gray-300">man</span>
                </div>
              </div>
            </Link>
          </div>
          <nav className="space-y-4 my-8">
          
            <Link
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              to="/dashboard"
            >
              Profile
            </Link>

            {userData?.role === "admin" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/adminHome"
                >
                  Admin's home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageUser"
                >
                  Manage Users
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageTask"
                >
                  Manage Tasks
                </Link>
              </>
            )}

            {userData?.role === "Buyer" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/buyerHome"
                >
                  Buyer's home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/addNewTask"
                >
                  Add new task
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/myTasks"
                >
                  My Tasks
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allPayments"
                >
                  All payments
                </Link>
              </>
            )}

            {userData?.role === "worker"  && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/workerHome"
                >
                  Worker's Home
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allTasks"
                >
                  All Tasks
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/mySubmissions"
                >
                  My Submissions
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/withDrawls"
                >
                  Withdrawals
                </Link>
              </>
            )}

            <button
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8 ">
        <h1 className="text-4xl font-bold mb-14 text-center text-gray-500">
          Welcome to Your Dashboard
        </h1>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
