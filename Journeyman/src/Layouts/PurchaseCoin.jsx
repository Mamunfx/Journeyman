import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import {
  FaCheck,
  FaRocket,
  FaChartLine,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

export default function PurchaseCoin() {
  const { user,notifyError,notify } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Card form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

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

  const handleSelect = (pkg) => {
    if (!loading) setSelected(pkg);
  };

  const handlePay = async () => {
    if (!user?.email) {
      setError("You must be logged in to purchase.");
      return;
    }
    if (!selected) {
      setError("Please select a package.");
      return;
    }
    if (!cardName || !cardNumber || !expiry || !cvc) {
      setError("Please fill in all card details.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // simulate payment delay
      await new Promise((res) => setTimeout(res, 1000));

      const response = await fetch(
        "https://journeyman-server-sigma.vercel.app/payments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: user.email,
            coins: selected.coins,
            amount: selected.price,
            payment_info: { cardName, cardNumber, expiry, cvc },
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment failed");

      notify(` You’ve been credited ${selected.coins} coins!`);
      // Reset form
      setSelected(null);
      setCardName("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-start gap-12">
        {/* Info Panel */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-[#66b3b3]">
            Why Purchase Coins?
          </h2>
          <p className="text-gray-600">
            Supercharge your experience with instant access to premium features,
            faster task processing, and 24/7 priority support. Choose a plan that
            fits your goals and watch your productivity soar!
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaRocket className="text-2xl text-[#66b3b3] mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Instant Processing</h4>
                <p className="text-gray-600 text-sm">
                  Get coins added to your account immediately after payment.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaChartLine className="text-2xl text-[#66b3b3] mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Advanced Analytics</h4>
                <p className="text-gray-600 text-sm">
                  Track your progress with premium stats and insights.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaHeadset className="text-2xl text-[#66b3b3] mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">24/7 Priority Support</h4>
                <p className="text-gray-600 text-sm">
                  Jump the queue and get help whenever you need it.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaShieldAlt className="text-2xl text-[#66b3b3] mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">Secure Payments</h4>
                <p className="text-gray-600 text-sm">
                  Industry-standard encryption keeps your data safe.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Packages Grid */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.coins}
              onClick={() => handleSelect(pkg)}
              className={`relative cursor-pointer rounded-xl border p-6 transition-transform ${
                pkg.highlighted
                  ? "scale-105 border-[#66b3b3] bg-gradient-to-br from-[#66b3b3] to-teal-400 text-white shadow-lg"
                  : "hover:scale-102 hover:shadow-lg bg-white border-gray-200"
              }`}
            >
              <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded ${
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
              <ul className="mt-4 space-y-2">
                {["Fast processing", "Secure & reliable", "24/7 support"].map(
                  (txt) => (
                    <li key={txt} className="flex items-center text-sm">
                      <FaCheck
                        className={`mr-2 ${
                          pkg.highlighted ? "text-white" : "text-green-500"
                        }`}
                      />
                      {txt}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
          onClick={() => !loading && setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Details
            </h3>
            <p className="mb-4 text-gray-700">
              Purchase <strong className="text-[#66b3b3]">{selected.coins}</strong> coins for{" "}
              <strong className="text-[#66b3b3]">${selected.price}</strong>.
            </p>

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
                  className="w-24 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#66b3b3]"
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