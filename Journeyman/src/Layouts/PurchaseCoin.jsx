import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaCheck } from "react-icons/fa";

export default function PurchaseCoin() {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // Card form state
  const [cardName, setCardName]     = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry]         = useState("");
  const [cvc, setCvc]               = useState("");

  const PACKAGES = [
    {
      title: "Starter Pack",
      coins: 10,
      price: 1,
      desc: "Perfect to get you started on your journey.",
      tag: "New",
      highlighted: false,
    },
    {
      title: "Standard Pack",
      coins: 150,
      price: 10,
      desc: "Great value for regular contributors.",
      tag: "Popular",
      highlighted: true,
    },
    {
      title: "Pro Pack",
      coins: 500,
      price: 20,
      desc: "Unlock advanced analytics & priority payouts.",
      tag: "Best Value",
      highlighted: false,
    },
    {
      title: "Ultimate Pack",
      coins: 1000,
      price: 35,
      desc: "All features + VIP support & early access.",
      tag: "Limited",
      highlighted: false,
    },
  ];

  const handlePay = async () => {
    if (!user?.email) {
      setError("You must be logged in to purchase.");
      return;
    }
    // basic validation
    if (!cardName || !cardNumber || !expiry || !cvc) {
      setError("Please fill in all card details.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // simulate payment delay
      await new Promise((r) => setTimeout(r, 1000));

      const res = await fetch("https://journeyman-server-sigma.vercel.app/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          coins:      selected.coins,
          amount:     selected.price,
          payment_info: { cardName, cardNumber, expiry, cvc },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      alert(`🎉 You’ve been credited ${selected.coins} coins!`);
      // reset form + close modal
      setSelected(null);
      setCardName("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-[#66b3b3]">
        Purchase Coins
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Boost your productivity with more coins: faster tasks, premium stats,
        priority payouts.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.coins}
            onClick={() => setSelected(pkg)}
            className={`relative cursor-pointer rounded-lg border p-6 transition-transform 
                        ${
                          pkg.highlighted
                            ? "scale-105 border-[#66b3b3] bg-gradient-to-br from-[#66b3b3] to-teal-400 text-white shadow-lg"
                            : "hover:scale-102 hover:shadow-md bg-white border-gray-200"
                        }`}
          >
            <span
              className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded 
                          ${
                            pkg.highlighted
                              ? "bg-white text-[#66b3b3]"
                              : "bg-[#66b3b3] text-white"
                          }`}
            >
              {pkg.tag}
            </span>

            <h3
              className={`text-2xl font-bold ${
                pkg.highlighted ? "text-white" : "text-[#66b3b3]"
              }`}
            >
              {pkg.coins} Coins
            </h3>
            <p
              className={`mt-1 text-xl font-semibold ${
                pkg.highlighted ? "text-white" : "text-gray-800"
              }`}
            >
              ${pkg.price}
            </p>
            <p
              className={`mt-3 text-sm ${
                pkg.highlighted ? "text-white/90" : "text-gray-600"
              }`}
            >
              {pkg.desc}
            </p>

            <ul className="mt-4 space-y-1">
              <li className="flex items-center text-sm">
                <FaCheck
                  className={`mr-2 ${
                    pkg.highlighted ? "text-white" : "text-green-500"
                  }`}
                />
                Fast processing
              </li>
              <li className="flex items-center text-sm">
                <FaCheck
                  className={`mr-2 ${
                    pkg.highlighted ? "text-white" : "text-green-500"
                  }`}
                />
                Secure & reliable
              </li>
              <li className="flex items-center text-sm">
                <FaCheck
                  className={`mr-2 ${
                    pkg.highlighted ? "text-white" : "text-green-500"
                  }`}
                />
                24/7 support
              </li>
            </ul>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => !loading && setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Enter Payment Details
            </h3>
            <p className="mb-4 text-gray-700">
              You’re about to purchase{" "}
              <strong className="text-[#66b3b3]">{selected.coins}</strong> coins
              for{" "}
              <strong className="text-[#66b3b3]">${selected.price}</strong>.
            </p>

            {/* Card Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
                disabled={loading}
              />
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
                  disabled={loading}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={4}
                  className="w-20 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 mb-4 text-center">{error}</p>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelected(null)}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePay}
                disabled={loading}
                className="px-4 py-2 bg-[#66b3b3] text-white rounded-lg hover:bg-[#5aa3a3] disabled:opacity-50 transition"
              >
                {loading ? "Processing…" : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}