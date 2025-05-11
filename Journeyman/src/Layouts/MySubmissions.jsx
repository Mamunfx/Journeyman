import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingState from "../Components/LoadingState";
import { AuthContext } from "../Context/AuthProvider";

const MySubmissions = () => {
  const { userData } = useContext(AuthContext);
  const userEmail = userData?.email;

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  // pagination state
  const [currentPage, setCurrentPage]   = useState(1);
  const itemsPerPage                     = 5;
  const totalPages                       = Math.ceil(submissions.length / itemsPerPage);

  // Modal state
  const [isModalOpen, setModalOpen]   = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/submissions/user/${userEmail}`)
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
        setError(err.message || "Failed to load submissions");
        setLoading(false);
      });
  }, [userEmail]);

  const openModal = (submission) => {
    setSelectedSub(submission);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSub(null);
    setModalOpen(false);
  };

  // derive data for current page
  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubs      = submissions.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) return <LoadingState />;
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="px-4 py-2 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">
        Tasks Submitted by Me
      </h1>
      <hr className="mb-6" />

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't submitted any tasks yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  
                  <th className="p-3 text-left">Task Title</th>
                  <th className="p-3 text-left">Submitted On</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSubs.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50">
                    
                    <td className="p-3">
                      <div className="font-medium">{sub.task_title}</div>
                    </td>
                    <td className="p-3">
                      {new Date(sub.current_date).toLocaleDateString()}{" "}
                      {new Date(sub.current_date).toLocaleTimeString()}
                    </td>
                    <td className="p-3">${sub.payable_amount}</td>
                    <td className="p-3">
                      <span
                        className={`badge ${
                          sub.status === "approved"
                            ? "btn btn-xs rounded-full bg-customColor border-customColor text-white"
                            : sub.status === "rejected"
                            ? "btn btn-xs rounded-full bg-red-600 border-red-600 text-white"
                            : "badge-ghost"
                        } badge-sm`}
                      >
                        {sub.status.charAt(0).toUpperCase() +
                          sub.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => openModal(sub)}
                        className="btn btn-outline btn-sm rounded-full border-customColor hover:bg-customColor hover:text-white hover:border-customColor"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center my-6">
              <div className="join">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn btn-sm hover:bg-customColor ${page === currentPage ? "btn-active bg-customColor" : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedSub && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Submission Details
            </h2>
            <div className="space-y-3 text-gray-800">
              <p>
                <strong>Task Title:</strong> {selectedSub.task_title}
              </p>
              <p>
                <strong>Worker Name:</strong> {selectedSub.worker_name}
              </p>
              <p>
                <strong>Worker Email:</strong> {selectedSub.worker_email}
              </p>
              <p>
                <strong>Client Email:</strong> {selectedSub.client_email}
              </p>
              <p>
                <strong>Submitted On:</strong>{" "}
                {new Date(selectedSub.current_date).toLocaleString()}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedSub.payable_amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedSub.status.charAt(0).toUpperCase() +
                  selectedSub.status.slice(1)}
              </p>
              <p>
                <strong>Details:</strong> {selectedSub.submission_details}
              </p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="btn btn-sm btn-outline hover:bg-customColor hover:text-white rounded-full hover:border-customColor border-customColor"
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

export default MySubmissions;