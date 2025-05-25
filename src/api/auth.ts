// src/api/auth.ts
interface User {
  email: string;
  password: string;
  id?: string;
  name?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const loginUser = async (credentials: Omit<User, 'id' | 'name'>): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const registerUser = async (userData: Omit<User, 'id'>): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
};