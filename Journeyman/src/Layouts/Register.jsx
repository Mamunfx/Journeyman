import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain letters and numbers."
      );
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage(
        "You must accept the Terms & Privacy Policy to register."
      );
      return;
    }

    const name = `${firstName} ${lastName}`;

    try {
      const userCredential = await createNewUser(email.toLowerCase(), password);
      await updateUserProfile({ displayName: name, photoURL: profilePic });

      const userData = {
        email: email.toLowerCase(),
        role,
        coins: role === "Worker" ? 10 : 50,
        displayName: name,
        photoURL: profilePic,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full bg-base-100 shadow-2xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center">Register Now</h1>
        <p className="text-center text-gray-600">
          Join us today and explore amazing features!
        </p>

        <button
          className="btn btn-md btn-outline rounded-full w-9/12 mx-auto flex items-center justify-center gap-2 transition-transform transform hover:scale-105 hover:bg-customColor hover:text-white hover:border-customColor my-6"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Register with Google
        </button>

        <div className="flex items-center justify-center my-4 w-full">
          <hr className="w-1/3 border-gray-400" />
          <span className="mx-3 text-gray-500">or</span>
          <hr className="w-1/3 border-gray-400" />
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Picture URL</span>
            </label>
            <input
              type="text"
              placeholder="Profile Picture URL"
              className="input input-bordered w-full"
              required
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <div className="relative">
              <button
                className="w-full  text-black border border-gray-400 px-4 py-2 rounded-md flex justify-between items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {role || "Select Role"}
                <span>▼</span>
              </button>
              {dropdownOpen && (
                <ul className="absolute w-full bg-white border border-gray-400 mt-2 rounded-md shadow-lg">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-[#66b3b3] hover:text-white"
                    onClick={() => setRole("Worker")}
                  >
                    Worker
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-[#66b3b3] hover:text-white"
                    onClick={() => setRole("Buyer")}
                  >
                    Buyer
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="form-control flex flex-row gap-2 py-4">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              className="checkbox checkbox-sm"
            />
            <div className="text-gray-600">
              I accept the{" "}
              <a href="/terms" className="text-customColor underline">
                Terms & Privacy Policy
              </a>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center my-6">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-center items-center">
            <button
              className="btn btn-md bg-customColor text-white rounded-full w-9/12 mx-auto hover:scale-105"
              type="submit"
              disabled={!acceptedTerms}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
