// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin, useRegister } from '../hooks/api/auth';
import { useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn, error: loginError } = useLogin();
  const { mutate: register, isPending: isRegistering, error: registerError } = useRegister();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Enter a valid email.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Minimum 6 characters.';

    if (isSignUp) {
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password.';
      else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isSignUp) {
        register({ email, password }, {
          onSuccess: (data: unknown) => {
            const authData = data as AuthResponse;
            localStorage.setItem('accessToken', authData.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setTimeout(() => navigate('/', { replace: true }), 500);
          }
        });
      } else {
        login({ email, password }, {
          onSuccess: (data: unknown) => {
            const authData = data as AuthResponse;
            localStorage.setItem('accessToken', authData.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
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

      {/* Rest of your JSX remains exactly the same */}
      <div className="flex items-center justify-center min-h-screen overflow-hidden">
        {/* ... all existing JSX ... */}
      </div>
    </>
  );
};

export default Login;