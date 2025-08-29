import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupHandleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form data:", formData);
    // TODO: Add validation and send to API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={signupHandleSubmit}>
          {/* Username */}
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

          {/* Email */}
          <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-purple-500">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          {/* Password */}
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

          {/* Confirm Password */}
          <label className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-purple-500">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full outline-none"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition mb-4"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
