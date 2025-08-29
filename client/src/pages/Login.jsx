import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Call login API or add logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
          Please Login..!!
        </h2>

        <form onSubmit={loginHandleSubmit}>
          {/* Username Field */}
          <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-purple-500">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full outline-none"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          {/* Password Field */}
          <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-purple-500">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition mb-4"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-500 font-medium underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
