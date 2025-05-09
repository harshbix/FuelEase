import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async () => {
    const newErrors = {};
    setSuccessMessage("");

    if (!email) newErrors.email = "Email is required.";
    else if (!isValidEmail(email)) newErrors.email = "Enter a valid email.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Minimum 6 characters.";

    if (isSignIn) {
      if (!confirmPassword) newErrors.confirmPassword = "Confirm your password.";
      else if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("/users.json");
        const users = await response.json();

        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (foundUser) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userProfile", JSON.stringify(foundUser));
          setSuccessMessage("Signed in successfully!");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500); // 0.5s
        } else {
          setErrors({ password: "Invalid credentials." });
        }
      } catch (error) {
        setErrors({ email: "Failed to fetch users." });
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
        <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
            FuelEase Station Manager
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {!isSignIn && (
            <div className="flex items-center justify-between mt-4">
              <label className="text-sm text-gray-700 flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            className="w-full mt-6 h-12 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>

          <button
            className="w-full mt-3 h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrors({});
              setSuccessMessage("");
            }}
          >
            {isSignIn ? "Back to Login" : "Create an Account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
