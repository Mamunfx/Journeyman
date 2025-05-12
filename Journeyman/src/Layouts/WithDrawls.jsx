import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const COINS_PER_DOLLAR = 20;
const MIN_WITHDRAWAL_COINS = 300;
const API_BASE = 'https://journeyman-server-sigma.vercel.app';

const WithDrawls = () => {
  const { userData } = useContext(AuthContext);

  // Use empty string so the input starts blank
  const [coinToWithdraw, setCoinToWithdraw] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('Bkash');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Recompute dollar amount when coinToWithdraw changes
  useEffect(() => {
    const n = Number(coinToWithdraw);
    if (!coinToWithdraw || isNaN(n)) {
      setWithdrawAmount(0);
    } else {
      setWithdrawAmount(Number((n / COINS_PER_DOLLAR).toFixed(2)));
    }
  }, [coinToWithdraw]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading your data…
      </div>
    );
  }

  const { coins = 0, email: worker_email } = userData;
  // Use displayName from AuthContext (fallback to 'name' if needed)
  const worker_name = userData.displayName || userData.name || '';
  const canWithdraw = coins >= MIN_WITHDRAWAL_COINS;

  const handleCoinChange = (e) => {
    const value = e.target.value;
    // Allow empty or positive integers only
    if (value === '' || /^\d+$/.test(value)) {
      if (value !== '' && Number(value) > coins) {
        setError(`You only have ${coins} coins.`);
        setCoinToWithdraw(String(coins));
      } else {
        setError('');
        setCoinToWithdraw(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const numCoins = Number(coinToWithdraw);

    if (!canWithdraw) return;
    if (!coinToWithdraw || numCoins < MIN_WITHDRAWAL_COINS) {
      setError(`Minimum withdrawal is ${MIN_WITHDRAWAL_COINS} coins.`);
      return;
    }
    if (!accountNumber.trim()) {
      setError('Please enter your account number.');
      return;
    }

    const payload = {
      worker_email,
      worker_name,
      withdrawal_coin: numCoins,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      withdraw_date: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await axios.post(`${API_BASE}/withdrawals`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess('Withdrawal request submitted successfully!');
      setCoinToWithdraw('');
      setAccountNumber('');
      setPaymentSystem('Bkash');
    } catch (err) {
      //console.error('Withdrawal error:', err);
      setError('Failed to submit withdrawal. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold  text-center mb-4">
        Withdrawal Request
      </h2>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded mb-4">
        <span className="text-gray-700">Balance:</span>
        <span className="font-medium text-gray-900">{coins} coins</span>
        <span className="text-gray-500">
          ({(coins / COINS_PER_DOLLAR).toFixed(2)} USD)
        </span>
      </div>

      {!canWithdraw && (
        <div className="text-center text-red-600 bg-red-100 p-3 rounded mb-4">
          Insufficient coins (min {MIN_WITHDRAWAL_COINS} coins required)
        </div>
      )}

      {canWithdraw && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Coins to withdraw</label>
            <input
              type="text"
              inputMode="numeric"
              value={coinToWithdraw}
              onChange={handleCoinChange}
              placeholder={`${MIN_WITHDRAWAL_COINS}+`}
              className="w-full px-3 py-2 border border-gray-300 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Withdrawal Amount (USD)
            </label>
            <input
              type="text"
              value={`$${withdrawAmount.toFixed(2)}`}
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200
                         rounded cursor-not-allowed"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Payment System</label>
            <select
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
            >
              <option>Bkash</option>
              <option>Rocket</option>
              <option>Nagad</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 017XXXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
          )}
          {success && (
            <div className="mb-4 text-green-600 text-sm font-medium">{success}</div>
          )}

          <button
            type="submit"
            disabled={!canWithdraw}
            className="w-full py-2 bg-[#66b3b3] text-white font-semibold rounded
                       hover:bg-[#5aa3a3] transition-colors disabled:bg-gray-300"
          >
            Withdraw
          </button>
        </form>
      )}
    </div>
  );
};

export default WithDrawls;