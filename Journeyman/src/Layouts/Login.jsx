import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin,user } = useContext(AuthContext); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
      console.log("User Logged In Successfully!");
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };
 console.log(user);
 
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Sign in to access exclusive features and manage your account effortlessly!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
               <Link to="/Register" className="label-text-alt link link-hover text-customColor">Dont have any account ?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-md bg-customColor text-white rounded-full text-lg" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
