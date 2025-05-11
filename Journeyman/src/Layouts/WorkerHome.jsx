import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaClock, FaDollarSign } from "react-icons/fa";
import LoadingState from "../Components/LoadingState";
import { AuthContext } from "../Context/AuthProvider";

const THEME = {
  primary: "#66b3b3",
  lightGray: "#f5f5f5",
  darkGray: "#333333",
};

const WorkerHome = () => {
  const { userData } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  // Summary stats
  const [totalCount, setTotalCount]       = useState(0);
  const [pendingCount, setPendingCount]   = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const email = userData?.email;
    if (!email) return;

    setLoading(true);
    axios
      .get(`https://journeyman-server-sigma.vercel.app/submissions/user/${email}`)
      .then((res) => {
        const allSubs = res.data;
        setSubmissions(allSubs);

        setTotalCount(allSubs.length);
        setPendingCount(
          allSubs.filter((s) => s.status === "pending").length
        );
        setTotalEarnings(
          allSubs
            .filter((s) => s.status === "approved")
            .reduce((sum, s) => sum + Number(s.payable_amount), 0)
        );
      })
      .catch((err) => {
        console.error("Error loading submissions:", err);
        setError(err.message || "Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [userData]);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  const approvedSubs = submissions.filter((s) => s.status === "approved");

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-12 ">
      <h1
        className="text-3xl font-extrabold text-center"
        style={{ color: THEME.darkGray }}
      >
        Worker Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          className="flex items-center rounded-xl shadow-lg p-6"
          style={{ backgroundColor: THEME.primary, color: "#fff" }}
        >
          <FaClipboardList size={32} className="mr-4 opacity-90" />
          <div>
            <p className="text-sm uppercase opacity-75">Total Submissions</p>
            <p className="text-3xl font-semibold">{totalCount}</p>
          </div>
        </div>

        <div
          className="flex items-center rounded-xl shadow-lg p-6"
          style={{ backgroundColor: THEME.lightGray, color: THEME.darkGray }}
        >
          <FaClock size={32} className="mr-4 opacity-90" />
          <div>
            <p className="text-sm uppercase opacity-75">Pending</p>
            <p className="text-3xl font-semibold">{pendingCount}</p>
          </div>
        </div>

        <div
          className="flex items-center rounded-xl shadow-lg p-6"
          style={{ backgroundColor: THEME.primary, color: "#fff" }}
        >
          <FaDollarSign size={32} className="mr-4 opacity-90" />
          <div>
            <p className="text-sm uppercase opacity-75">Earnings</p>
            <p className="text-3xl font-semibold">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Approved Submissions */}
      <div>
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: THEME.darkGray }}
        >
          Approved Submissions
        </h2>

        {approvedSubs.length === 0 ? (
          <p className="text-left py-8" style={{ color: THEME.darkGray }}>
            No approved submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table
              className="w-full table-auto"
              style={{ backgroundColor: "#fff" }}
            >
              <thead>
                <tr style={{ backgroundColor: THEME.lightGray, color: THEME.darkGray }}>
                  <th className="p-4 text-left">Task Title</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-left">Buyer Name</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubs.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4" style={{ color: THEME.darkGray }}>
                      {sub.task_title}
                    </td>
                    <td
                      className="p-4 text-right"
                      style={{ color: THEME.darkGray }}
                    >
                      ${Number(sub.payable_amount).toFixed(2)}
                    </td>
                    <td className="p-4" style={{ color: THEME.darkGray }}>
                      {sub.client_name || sub.client_email}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className="inline-block px-3 py-1 text-sm font-medium rounded-full"
                        style={{
                          backgroundColor: "#e6f7f7",
                          color: THEME.primary,
                        }}
                      >
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;