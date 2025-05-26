import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      // Redirect or update auth state
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}