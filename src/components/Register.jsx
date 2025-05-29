import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "manager",
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

    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post(
        "https://fuel-ease-api.mwombekilubere.workers.dev/api/users/register",
        formData
      );

      if (response.status === 201) {
        toast.success("Account created successfully!");
        navigate({ to: "/login" });
      }
    } catch (err) {
      console.error("Error response:", err.response?.data);
      const backendError =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed";
      setError(backendError);
    }
  };

  return (
    <div className="flex justify-center py-5 bg-gray-200 min-h-[100vh]">
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
            { label: "Role", name: "role", type: "select", options: ["manager"] },
          ].map(({ label, name, type = "text", options }) => (
            <div className="mb-2" key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>

              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {options.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full h-12 bg-blue-800 text-white rounded-sm hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="w-full h-12 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition mt-3"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
