import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "Manager",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://fuel-ease-api.mwombekilubere.workers.dev/api/users/register",
        formData
      );

      if (response.status === 201) {
        navigate({ to: "/login" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-[400px] bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-4 text-center">
          FuelEase Registration
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-12 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Manager">Manager</option>
              <option value="Attendant">Attendant</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-800 text-white rounded-sm hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="w-full h-12 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition mt-4"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
