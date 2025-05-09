import React from "react";

const Login = () => {
    return (
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
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center text-sm text-gray-700">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2">Remember me</span>
                    </label>
                    <a
                        href="#"
                        className="text-sm text-blue-800 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>
                <button className="w-full h-12 bg-blue-800 text-white rounded-sm hover:bg-blue-700 transition">
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
