import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, handleGoogleSignIn,notify } = useContext(AuthContext);
  const location=useLocation();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
      notify("User Logged In Successfully!");
      navigate(location?.state?.from?.pathname && location.state.from.pathname !== "" ? location.state.from.pathname : "/", { replace: true });

    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row bg-base-100 shadow-2xl rounded-lg overflow-hidden gap-4 my-8">
        

        <div className="flex flex-col justify-center p-6 bg-customColor text-white w-full lg:w-1/2 rounded-b-[2rem]  lg:rounded-tr-[5rem] lg:rounded-br-[5rem]  lg:rounded-b-none text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-md lg:text-lg">
            Sign in and find your desired task or get your work done with elite journeyman!
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-8 flex flex-col items-center">

          <div className="w-full flex justify-center">
            <button
              className="btn btn-md btn-outline rounded-full w-full max-w-[320px] flex items-center justify-center gap-2 transition-transform transform hover:scale-105 hover:bg-customColor hover:text-white hover:border-customColor" 
              type="button"
              onClick={handleGoogleSignIn}
            >
              <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
              Login with Google
            </button>
          </div>

          <div className="flex items-center justify-center my-6 w-full max-w-[320px]">
            <hr className="w-1/3 border-gray-400 rounded-full h-1" />
            <span className="mx-3 text-gray-500">or</span>
            <hr className="w-1/3 border-gray-400 rounded-full h-1" />
          </div>


          <form className="space-y-4 w-full max-w-[320px]" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input 
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input 
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <Link to="/Register" className="label-text-alt link link-hover text-customColor">Don't have an account?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-md bg-customColor text-white rounded-full text-lg w-full transition-transform transform hover:scale-105" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
