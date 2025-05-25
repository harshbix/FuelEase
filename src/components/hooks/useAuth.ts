// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../../api/auth';
import { queryClient } from '../../lib/queryClient';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      queryClient.setQueryData(['auth'], data.user);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      queryClient.setQueryData(['auth'], data.user);
    },
  });
};