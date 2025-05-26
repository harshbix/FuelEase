import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../../api/authApi'; 

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) => 
      authApi.login(credentials),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (userData: { email: string; password: string }) => 
      authApi.register(userData),
  });
}