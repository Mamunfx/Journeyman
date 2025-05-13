import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Correct import
import { GiHamburgerMenu } from "react-icons/gi";
import { SiPaloaltonetworks } from "react-icons/si";
import { AuthContext } from "../Context/AuthProvider";
import { BiSolidRightArrow } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";

const Dashboard = () => {
  const { logOut, user, updateUserProfile, userData,notifyError,notify } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


  const handleUpdate = (updatedInfo) => {
    updateUserProfile(updatedInfo);
    notify("Profile updated successfully");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        //console.error("Error during logout:", error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-3/12 bg-gray-500 p-4 lg:rounded-r-2xl ">
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

            {userData?.role === "Admin" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/adminHome"
                >
                  <div className="flex gap-2 items-center">
                 <FaHome  className="text-customColor text-sm"/> Admin's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageUser"
                >
                  <div className="flex gap-2 items-center">
                 <FaUsers className="text-customColor text-sm font-bold"/> Manage user's
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageTask"
                >
                  <div className="flex gap-2 items-center">
                 <BsListTask  className="text-customColor text-sm"/> Manage task's
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
                 <FaHome  className="text-customColor text-sm"/> Buyer's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/addNewTask"
                >
                  <div className="flex gap-2 items-center">
                 <MdFormatListBulletedAdd  className="text-customColor text-sm font-bold"/> Add new task
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/myTasks"
                >
                  <div className="flex gap-2 items-center">
                 <BsListTask className="text-customColor text-sm font-bold"/> My tasks
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allPayments"
                >
                  <div className="flex gap-2 items-center">
                 <MdPayments  className="text-customColor text-sm"/> All payments
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/purchaseCoin"
                >
                 <div className="flex gap-2 items-center">
                 <GiTwoCoins className="text-customColor text-sm"/> Purchase coins
                 </div>
                </Link>
              </>
            )}

            {(userData?.role === "Worker" || userData?.role == undefined) && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/workerHome"
                >
                 <div className="flex gap-2 items-center">
                 <FaHome className="text-customColor text-sm"/> Worker's Home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allTasks"
                >
                  <div className="flex gap-2 items-center">
                  <BsListTask className="text-customColor text-sm font-bold"/> All Tasks
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/mySubmissions"
                >
                  <div className="flex gap-2 items-center">
                  <MdFormatListBulletedAdd  className="text-customColor text-sm font-bold"/> My Submissions
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/withDrawls"
                >
                  <div className="flex gap-2 items-center">
                 <BiMoneyWithdraw  className="text-customColor text-sm"/> Withdrawls
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

            {userData?.role === "Admin" && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/adminHome"
                >
                  <div className="flex gap-2 items-center">
                 <FaHome  className="text-customColor text-sm"/> Admin's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageUser"
                >
                  <div className="flex gap-2 items-center">
                 <FaUsers className="text-customColor text-sm font-bold"/> Manage user's
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/manageTask"
                >
                  <div className="flex gap-2 items-center">
                 <BsListTask  className="text-customColor text-sm"/> Manage task's
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
                 <FaHome  className="text-customColor text-sm"/> Buyer's home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/addNewTask"
                >
                  <div className="flex gap-2 items-center">
                 <MdFormatListBulletedAdd  className="text-customColor text-sm font-bold"/> Add new task
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/myTasks"
                >
                  <div className="flex gap-2 items-center">
                 <BsListTask className="text-customColor text-sm font-bold"/> My tasks
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allPayments"
                >
                  <div className="flex gap-2 items-center">
                 <MdPayments  className="text-customColor text-sm"/> All payments
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/purchaseCoin"
                >
                 <div className="flex gap-2 items-center">
                 <GiTwoCoins className="text-customColor text-sm"/> Purchase coins
                 </div>
                </Link>
              </>
            )}

            {(userData?.role === "Worker" || userData?.role == undefined) && (
              <>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/workerHome"
                >
                 <div className="flex gap-2 items-center">
                 <FaHome className="text-customColor text-sm"/> Worker's Home
                 </div>
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/allTasks"
                >
                  <div className="flex gap-2 items-center">
                  <BsListTask className="text-customColor text-sm font-bold"/> All Tasks
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/mySubmissions"
                >
                  <div className="flex gap-2 items-center">
                  <MdFormatListBulletedAdd  className="text-customColor text-sm font-bold"/> My Submissions
                 </div>
                  
                </Link>
                <Link
                  className="block w-full px-4 py-2 text-left text-xl text-gray-300 hover:bg-customColor rounded"
                  to="/dashboard/withDrawls"
                >
                  <div className="flex gap-2 items-center">
                 <BiMoneyWithdraw  className="text-customColor text-sm"/> Withdrawls
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
