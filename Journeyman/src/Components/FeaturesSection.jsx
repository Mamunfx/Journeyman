import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      {/* Heading & Tagline */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-500">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-2">
          Revolutionizing Micro Task Earning—Faster, Smarter, Fairer!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Section: Details About the Platform */}
        <div className="text-xl">
          <h3 className="text-3xl font-semibold text-gray-700">
            The Future of Micro Task Earnings
          </h3>
          <p className="mt-4 text-gray-600 w-4/6">
            Our platform is designed to provide seamless task completion with
            higher payouts, instant withdrawals, and intelligent
            task matching—all in a user-friendly and secure environment, instant withdrawals, and intelligent. Lorem ipsum dolor sit amet.
          </p>
          <p className="mt-4 text-gray-600">
            Join thousands of users worldwide and start earning today!
          </p>
        </div>

        {/* Right Section: Feature Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: "💰",
              title: "Better Earnings",
              desc: "Higher payouts & transparent commissions.",
            },
            {
              icon: "🚀",
              title: "Instant Withdrawals",
              desc: "No delays, instant cash-out anytime.",
            },
            {
              icon: "🔒",
              title: "Secure & Reliable",
              desc: "Advanced security ensures safe transactions.",
            },
            {
              icon: "🌎",
              title: "Global Access",
              desc: "Available worldwide, no restrictions.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h4 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h4>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
