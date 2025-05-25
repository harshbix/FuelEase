// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin, useRegister } from '../hooks/useAuth';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn, error: loginError } = useLogin();
  const { mutate: register, isPending: isRegistering, error: registerError } = useRegister();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = () => {
    const newErrors: FormErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Enter a valid email.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Minimum 6 characters.';

    if (isSignIn) {
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password.';
      else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isSignIn) {
        register({ email, password }, {
          onSuccess: () => {
            setTimeout(() => navigate('/', { replace: true }), 500);
          }
        });
      } else {
        login({ email, password }, {
          onSuccess: () => {
            setTimeout(() => navigate('/', { replace: true }), 500);
          }
        });
      }
    }
  };

  const authError = loginError || registerError;
  const isProcessing = isLoggingIn || isRegistering;

  return (
    <>
      {authError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded shadow-lg z-50">
          {authError.message}
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen overflow-hidden">
        <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
            FuelEase Station Manager
          </h2>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isProcessing}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={isProcessing}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (only for sign up) */}
            {isSignIn && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full h-11 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isProcessing}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  disabled={isProcessing}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {/* Remember me & Forgot password */}
          {!isSignIn && (
            <div className="flex items-center justify-between mt-4">
              <label className="text-sm text-gray-700 flex items-center">
                <input type="checkbox" className="mr-2" disabled={isProcessing} /> Remember me
              </label>
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            className={`w-full mt-6 h-12 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition flex items-center justify-center ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : isSignIn ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </button>

          {/* Toggle between Login/Signup */}
          <button
            className={`w-full mt-3 h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrors({});
            }}
            disabled={isProcessing}
          >
            {isSignIn ? 'Back to Login' : 'Create an Account'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;