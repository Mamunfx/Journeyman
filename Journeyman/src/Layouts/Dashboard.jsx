import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Correct import
import { GiHamburgerMenu } from "react-icons/gi";
import { SiPaloaltonetworks } from "react-icons/si";
import { AuthContext } from "../Context/AuthProvider";
import { BiSolidRightArrow } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
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
      <div className="w-full lg:w-3/12 bg-gray-500 p-4">
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
              
             My profile
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
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/purchaseCoin"
                >
                  Purchase Coins
                </Link>
              </>
            )}

            {userData?.role === "Worker"  && (
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
              <div className="flex gap-2 items-center">
                 <CiLogout className="text-customColor"/> Logout
                 </div>
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
             My profile
            </Link>

            {userData?.role === "admin" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/adminHome"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Admin's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageUser"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Manage user's
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageTask"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Manage task's
                 </div>
                </Link>
              </>
            )}

            {userData?.role === "Buyer" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/buyerHome"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Buyer's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/addNewTask"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Add new task
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/myTasks"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> My tasks
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allPayments"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> All payments
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/purchaseCoin"
                >
                 <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Purchase coins
                 </div>
                </Link>
              </>
            )}

            {userData?.role === "Worker"  && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/workerHome"
                >
                 <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Worker's Home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allTasks"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow className="text-customColor text-sm" /> All Tasks
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/mySubmissions"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm" /> My Submissions
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/withDrawls"
                >
                  <div className="flex gap-2 items-center">
                 <BiSolidRightArrow  className="text-customColor text-sm"/> Withdrawls
                 </div>
                </Link>
              </>
            )}

            <button
              className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
              onClick={handleLogOut}
            >
            <div className="flex gap-2 items-center">
                 <CiLogout className="text-customColor"/> Logout
                 </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1  py-2">
        
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
