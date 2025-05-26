import axiosClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const authApi = {
  login: (credentials) => axiosClient.post(API_ENDPOINTS.LOGIN, credentials),
  register: (userData) => axiosClient.post(API_ENDPOINTS.REGISTER, userData),
  logout: () => axiosClient.post(API_ENDPOINTS.LOGOUT),
  refreshToken: (refreshToken) => 
    axiosClient.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken }),
};