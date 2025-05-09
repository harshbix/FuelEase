import React, { useState, useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = () => {
        const newErrors = {};
        setSuccessMessage(""); // Reset message on new submit

        if (!email) newErrors.email = "Email is required.";
        else if (!isValidEmail(email)) newErrors.email = "Please enter a valid email.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";

        if (isSignIn) {
            if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
            else if (password !== confirmPassword)
                newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSuccessMessage(isSignIn ? "Signed up successfully!" : "Signed in successfully!");
        }
    };

    // Auto-hide success message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <>
            {/* Toast Notification */}
            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300">
                    {successMessage}
                </div>
            )}

            {/* Form UI */}
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="w-[400px] bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-medium text-gray-900 mb-4 text-center">
                        FuelEase Station Manager
                    </h1>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {isSignIn && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    {!isSignIn && (
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-800 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    <button
                        className="w-full h-12 bg-blue-800 text-white rounded-sm hover:bg-blue-700 transition"
                        onClick={handleSubmit}
                    >
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </button>

                    <button
                        className="w-full h-12 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition mt-4"
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
