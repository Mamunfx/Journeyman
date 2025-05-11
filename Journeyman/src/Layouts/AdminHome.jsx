import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const THEME = '#66b3b3';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and withdrawals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, withdrawalsRes] = await Promise.all([
          axios.get(`${API_BASE}/users`),
          axios.get(`${API_BASE}/withdrawals`),
        ]);
        setUsers(usersRes.data);
        setWithdrawals(withdrawalsRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  // Compute stats
  const workerCount = users.filter(u => u.role === 'Worker').length;
  const buyerCount = users.filter(u => u.role === 'Buyer').length;
  const totalCoins = users.reduce((sum, u) => sum + (u.coins || 0), 0);
  const totalPaymentsUSD = withdrawals
    .filter(w => w.status === 'approved')
    .reduce((sum, w) => sum + (w.withdrawal_amount || 0), 0);

  // Pending withdrawal requests
  const pending = withdrawals.filter(w => w.status === 'pending');

  // Handle approving a withdrawal
  const handlePaymentSuccess = async wd => {
    try {
      // 1) Update withdrawal status on server
      await axios.put(
        `${API_BASE}/withdrawals/${wd._id}`,
        { status: 'approved' }
      );

      // 2) Find the worker and compute new coin balance
      const worker = users.find(u => u.email === wd.worker_email);
      if (!worker) {
        alert('Error: Worker not found.');
        return;
      }
      const newCoinCount = (worker.coins || 0) - wd.withdrawal_coin;
      if (newCoinCount < 0) {
        alert('Error: Worker has insufficient coins.');
        return;
      }

      // 3) Update worker's coins on server (only coins field)
      await axios.put(
        `${API_BASE}/users/${encodeURIComponent(worker.email)}`,
        { coins: newCoinCount }
      );

      // 4) Update local state
      setWithdrawals(ws =>
        ws.map(x => (x._id === wd._id ? { ...x, status: 'approved' } : x))
      );
      setUsers(us =>
        us.map(u =>
          u.email === worker.email ? { ...u, coins: newCoinCount } : u
        )
      );
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to process payment. See console for details.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center" style={{ color: THEME }}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          className="p-4 bg-white rounded shadow border-l-4"
          style={{ borderColor: THEME }}
        >
          <p className="text-sm text-gray-500">Total Workers</p>
          <p className="text-2xl font-semibold">{workerCount}</p>
        </div>
        <div
          className="p-4 bg-white rounded shadow border-l-4"
          style={{ borderColor: THEME }}
        >
          <p className="text-sm text-gray-500">Total Buyers</p>
          <p className="text-2xl font-semibold">{buyerCount}</p>
        </div>
        <div
          className="p-4 bg-white rounded shadow border-l-4"
          style={{ borderColor: THEME }}
        >
          <p className="text-sm text-gray-500">Total Available Coins</p>
          <p className="text-2xl font-semibold">{totalCoins}</p>
        </div>
        <div
          className="p-4 bg-white rounded shadow border-l-4"
          style={{ borderColor: THEME }}
        >
          <p className="text-sm text-gray-500">Total Payments (USD)</p>
          <p className="text-2xl font-semibold">
            ${totalPaymentsUSD.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Pending Withdrawals Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-[#66b3b3]">
            <tr>
              <th className="px-4 py-2 text-left text-white">Worker</th>
              <th className="px-4 py-2 text-left text-white">Email</th>
              <th className="px-4 py-2 text-center text-white">Coins</th>
              <th className="px-4 py-2 text-center text-white">
                Amount ($)
              </th>
              <th className="px-4 py-2 text-center text-white">
                Requested At
              </th>
              <th className="px-4 py-2 text-center text-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pending.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500"
                >
                  No pending withdrawal requests.
                </td>
              </tr>
            ) : (
              pending.map(wd => (
                <tr key={wd._id}>
                  <td className="px-4 py-2">{wd.worker_name}</td>
                  <td className="px-4 py-2">{wd.worker_email}</td>
                  <td className="px-4 py-2 text-center">
                    {wd.withdrawal_coin}
                  </td>
                  <td className="px-4 py-2 text-center">
                    ${wd.withdrawal_amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(wd.withdraw_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handlePaymentSuccess(wd)}
                      className="px-3 py-1 bg-[#66b3b3] text-white rounded hover:bg-[#5aa3a3] transition"
                    >
                      Payment Success
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;