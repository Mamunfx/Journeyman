import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import LoadingState from "../Components/LoadingState";
import { AuthContext } from "../Context/AuthProvider";

const THEME = {
  primary: "#66b3b3",
  lightGray: "#f5f5f5",
  darkGray: "#333333",
};

const BuyerHome = () => {
  const { userData ,notifyError,notify} = useContext(AuthContext);
  const email = userData?.email;

  const [tasks, setTasks] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalSub, setModalSub] = useState(null);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    Promise.all([
      axios.get(
        `https://journeyman-server-sigma.vercel.app/tasks/user/${encodeURIComponent(email)}`
      ),
      axios.get(
        `https://journeyman-server-sigma.vercel.app/submissions/client/${encodeURIComponent(email)}`
      ),
    ])
      .then(([taskRes, subRes]) => {
        setTasks(taskRes.data);
        setSubs(subRes.data);
      })
      .catch((err) => {
        //console.error(err);
        setError(err.message || "Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [email]);

  const refreshData = () => {
    Promise.all([
      axios.get(
        `https://journeyman-server-sigma.vercel.app/tasks/user/${encodeURIComponent(email)}`
      ),
      axios.get(
        `https://journeyman-server-sigma.vercel.app/submissions/client/${encodeURIComponent(email)}`
      ),
    ]).then(([t, s]) => {
      setTasks(t.data);
      setSubs(s.data);
    });
  };

  const handleApprove = (id) => {
    axios
      .put(`https://journeyman-server-sigma.vercel.app/submissions/${id}`, { status: "approved" })
      .then(() => {
        refreshData();
        setModalSub(null);
        notify("Submission approved successfully");
      })
      .catch(() => notifyError("Failed to approve submission"));
  };

  const handleReject = (id) => {
    axios
      .put(`https://journeyman-server-sigma.vercel.app/submissions/${id}`, {
        status: "rejected",
      })
      .then(() => {
        refreshData();
        setModalSub(null);
        notify("Submission rejected successfully");
      })
      .catch(() => notifyError("Failed to reject submission"));
  };

  if (loading) return <LoadingState />;
  if (error)
    return (
      <div className="flex justify-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );

  // Stats
  const totalTasks = tasks.length;
  const pendingWorkers = tasks.reduce(
    (sum, t) => sum + Number(t.required_workers),
    0
  );
  const totalPaid = subs
    .filter((s) => s.status === "approved")
    .reduce((sum, s) => sum + Number(s.payable_amount), 0);

  const pendingSubs = subs.filter((s) => s.status === "pending");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-white">
      <h1
        className="text-4xl font-extrabold text-center"
        style={{ color: THEME.darkGray }}
      >
        Buyer Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          className="p-6 rounded-lg shadow"
          style={{ backgroundColor: THEME.primary, color: "#fff" }}
        >
          <h2 className="text-sm uppercase opacity-75">Total Tasks</h2>
          <p className="text-3xl font-semibold">{totalTasks}</p>
        </div>
        <div
          className="p-6 rounded-lg shadow"
          style={{ backgroundColor: THEME.lightGray, color: THEME.darkGray }}
        >
          <h2 className="text-sm uppercase opacity-75">Pending Workers</h2>
          <p className="text-3xl font-semibold">{pendingWorkers}</p>
        </div>
        <div
          className="p-6 rounded-lg shadow"
          style={{ backgroundColor: THEME.primary, color: "#fff" }}
        >
          <h2 className="text-sm uppercase opacity-75">Total Paid</h2>
          <p className="text-3xl font-semibold">${totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Pending submissions */}
      <div>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: THEME.darkGray }}
        >
          Submissions to Review
        </h2>
        {pendingSubs.length === 0 ? (
          <p className="text-gray-500">No submissions pending review.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table w-full bg-gray-50">
              <thead style={{ backgroundColor: THEME.lightGray }}>
                <tr>
                  <th className="p-3 text-left">Worker</th>
                  <th className="p-3 text-left">Task</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSubs.map((s) => (
                  <tr
                    key={s._id}
                    className="border-t hover:bg-white transition-colors"
                  >
                    <td className="p-3" style={{ color: THEME.darkGray }}>
                      {s.worker_name}
                    </td>
                    <td className="p-3" style={{ color: THEME.darkGray }}>
                      {s.task_title}
                    </td>
                    <td
                      className="p-3 text-right"
                      style={{ color: THEME.darkGray }}
                    >
                      ${Number(s.payable_amount).toFixed(2)}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => setModalSub(s)}
                        className="btn btn-sm btn-outline"
                        style={{
                          borderColor: THEME.primary,
                          color: THEME.darkGray,
                        }}
                      >
                        <FaEye className="inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleApprove(s._id)}
                        className="btn btn-sm"
                        style={{ backgroundColor: THEME.primary, color: "#fff" }}
                      >
                        <FaCheck className="inline mr-1" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(s._id)}
                        className="btn btn-sm btn-outline"
                        style={{ borderColor: "red", color: "red" }}
                      >
                        <FaTimes className="inline mr-1" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {modalSub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4">
            <h3
              className="text-xl font-bold"
              style={{ color: THEME.darkGray }}
            >
              Submission Detail
            </h3>
            <p>
              <strong>Worker:</strong> {modalSub.worker_name}
            </p>
            <p>
              <strong>Task:</strong> {modalSub.task_title}
            </p>
            <p>
              <strong>Amount:</strong> ${modalSub.payable_amount}
            </p>
            <p>
              <strong>Submitted At:</strong>{" "}
              {new Date(modalSub.current_date).toLocaleString()}
            </p>
            <p>
              <strong>Details:</strong>
            </p>
            <p className="whitespace-pre-wrap">
              {modalSub.submission_detail}
            </p>
            <div className="text-right">
              <button
                onClick={() => setModalSub(null)}
                className="btn btn-sm btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;