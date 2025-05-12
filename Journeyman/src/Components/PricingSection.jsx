import React from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const PricingSection = () => {
  const plans = [
    {
      title: "Basic",
      price: "$9.99",
      features: [
        { text: "Access to micro-tasks", available: true },
        { text: "Standard payouts", available: true },
        { text: "Email support", available: true },
        { text: "Basic analytics dashboard", available: false },
        { text: "Exclusive task opportunities", available: false },
        { text: "VIP customer support", available: false },
      ],
      highlighted: false,
    },
    {
      title: "Pro",
      price: "$19.99",
      features: [
        { text: "Access to micro-tasks", available: true },
        { text: "Higher earnings", available: true },
        { text: "Priority withdrawals", available: true },
        { text: "Advanced analytics dashboard", available: true },
        { text: "Exclusive task opportunities", available: true },
        { text: "VIP customer support", available: false },
      ],
      highlighted: true,
    },
    {
      title: "Elite",
      price: "$34.99",
      features: [
        { text: "Access to micro-tasks", available: true },
        { text: "Best payouts", available: true },
        { text: "Instant withdrawals", available: true },
        { text: "Premium task recommendations", available: true },
        { text: "Early access to new features", available: true },
        { text: "VIP customer support", available: true },
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 px-6 w-11/12 mx-auto">
      {/* Heading */}
      <div className="text-center mb-24">
        <h2 className="text-5xl font-bold text-gray-500">Choose Your Plan</h2>
        <p className="text-lg text-gray-500 mt-2">
          Unlock new opportunities with plans designed for maximum earnings.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-lg shadow-lg border transition-all duration-300 transform
              ${
                plan.highlighted
                  ? "scale-110 border-[rgb(102,179,179)] shadow-xl bg-gradient-to-br from-[rgb(102,179,179)] to-teal-400 text-white"
                  : "hover:scale-105 hover:border-gray-300 hover:shadow-md bg-white"
              }`}
          >
            {/* Plan Title */}
            <h3 className={`text-3xl font-bold ${plan.highlighted ? "text-white" : "text-gray-500"}`}>
              {plan.title}
            </h3>

            {/* Plan Price */}
            <p className={`text-5xl font-semibold mt-6 ${plan.highlighted ? "text-white" : "text-[rgb(102,179,179)]"}`}>
              {plan.price}
            </p>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center text-lg ${
                    feature.available
                      ? plan.highlighted
                        ? "text-white"
                        : "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {/* Icon */}
                  <span
                    className={`text-sm mr-2 ${
                      feature.available
                        ? plan.highlighted
                          ? "text-white" 
                          : "text-customColor" 
                        : "text-gray-400" 
                    }`}
                  >
                    {feature.available ? <FaCheck /> : "🚫"}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            {/* Get Started Button */}
            <Link to="/dashboard">
            <button
              className={`mt-8 w-full py-3 font-semibold rounded-full transition-all duration-300 ${
                plan.highlighted
                  ? "bg-white text-[rgb(102,179,179)] hover:bg-gray-200"
                  : "bg-[rgb(102,179,179)] text-white hover:bg-teal-500"
              }`}
            >Get Started
              
            </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;