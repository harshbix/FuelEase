import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';

export function useRegister() {
  return useMutation({
    mutationFn: (userData) => authApi.register(userData),
    onSuccess: () => {
      // Redirect to login or show success message
    },
  });
}