import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", formData);
  };

  return (
    <div className="mt-16 bg-linear-to-br from-[#06332e] to-[#084d45] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          data-aos="zoom-in"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#f7a582] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#f7a582] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#06332e] hover:bg-[#084d45] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#f7a582] hover:text-[#e59470] font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
