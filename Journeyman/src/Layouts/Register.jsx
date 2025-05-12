import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaUserTie,
  FaRocket,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Worker");
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { createNewUser, updateUserProfile, handleGoogleSignIn } =
    useContext(AuthContext);

  const validateEmail = (em) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  const validatePassword = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 chars and include letters & numbers."
      );
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage("You must accept Terms & Privacy Policy.");
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    try {
      const userCred = await createNewUser(email.toLowerCase(), password);
      await updateUserProfile({ displayName: fullName, photoURL: profilePic });
      await axios.post(
        "https://journeyman-server-sigma.vercel.app/users",
        {
          email: email.toLowerCase(),
          role,
          coins: role === "Worker" ? 10 : 50,
          displayName: fullName,
          photoURL: profilePic,
        }
      );
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center px-4 py-24">
      <div className="max-w-7xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 ">
        {/* Left Info Panel */}
        <div className="hidden lg:flex flex-col justify-center items-start bg-customColor p-12 space-y-6 text-white rounded-r-[8rem]">
          <h2 className="text-4xl font-extrabold">Welcome to Journeyman</h2>
          <p className="text-lg">
            Join a community of creators and unlock premium tools to accelerate
            your workflow. Register now and start earning coins!
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaRocket className="mr-3 text-2xl" />
              <span>Fast onboarding</span>
            </li>
            <li className="flex items-center">
              <FaChartLine className="mr-3 text-2xl" />
              <span>Powerful analytics</span>
            </li>
            <li className="flex items-center">
              <FaHeadset className="mr-3 text-2xl" />
              <span>24/7 priority support</span>
            </li>
          </ul>
          
        </div>

        {/* Right Form Panel */}
        <div className="p-8 lg:p-12 ">
          <h1 className="text-3xl font-extrabold text-center text-gray-400">
            Create Your Account
          </h1>
          <p className="text-center text-gray-500 mb-6 mt-1">
            It’s quick and free.
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-9/12 mx-auto flex items-center justify-center gap-2 py-2 mb-6 border-2 border-gray-200 rounded-full hover:border-teal-400 hover:bg-teal-50 transition"
          >
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign up with Google
            </span>
          </button>

          <div className="flex items-center justify-center text-gray-300 mb-6">
            <hr className="w-1/3" />
            <span className="mx-2">or</span>
            <hr className="w-1/3" />
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Name Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="pl-10 w-full border border-gray-200 rounded-lg py-2 focus:ring-2 focus:ring-teal-300 outline-none transition"
                />
              </div>
              <div className="relative">
                <FaUserTie className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="pl-10 w-full border border-gray-200 rounded-lg py-2 focus:ring-2 focus:ring-teal-300 outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 w-full border border-gray-200 rounded-lg py-2 focus:ring-2 focus:ring-teal-300 outline-none transition"
              />
            </div>

            {/* Profile Pic URL */}
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="url"
                placeholder="Profile Picture URL"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                required
                className="pl-10 w-full border border-gray-200 rounded-lg py-2 focus:ring-2 focus:ring-teal-300 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 w-full border border-gray-200 rounded-lg py-2 focus:ring-2 focus:ring-teal-300 outline-none transition"
              />
            </div>

            {/* Role Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center focus:ring-2 focus:ring-teal-300 transition"
              >
                <span className="capitalize">{role}</span>
                <span className="text-gray-400">▾</span>
              </button>
              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {["Worker", "Buyer"].map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setRole(opt);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-teal-50 cursor-pointer"
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 mt-2 text-gray-600">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-teal-600 hover:underline"
                >
                  Terms & Privacy
                </a>
              </span>
            </label>

            {errorMessage && (
              <p className="text-red-500 text-center text-sm">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!acceptedTerms}
              className="w-9/12 mx-auto flex items-center justify-center py-2 bg-gradient-to-r from-customColor to-teal-300 text-white font-semibold rounded-full shadow hover:from-teal-600 hover:to-teal-500 transition disabled:opacity-25"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;