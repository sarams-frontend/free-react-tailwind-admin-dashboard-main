/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  signUp: (data: SignUpData) =>
    apiClient.post<AuthResponse>('/auth/signup', data),

  logout: () =>
    apiClient.post('/auth/logout'),

  refreshToken: () =>
    apiClient.post<{ token: string }>('/auth/refresh'),

  getCurrentUser: () =>
    apiClient.get<AuthResponse['user']>('/auth/me'),
};