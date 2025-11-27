import { create } from 'zustand';
import { authService, type LoginCredentials, type SignUpData } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  // Old signature for backward compatibility
  login: (credentials?: LoginCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state from localStorage
  isAuthenticated: localStorage.getItem('auth') === 'true',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('authToken'),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    // If called without credentials (old behavior), just set authenticated
    if (!credentials) {
      localStorage.setItem('auth', 'true');
      set({ isAuthenticated: true });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);

      // Save to localStorage
      localStorage.setItem('auth', 'true');
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      set({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signUp(data);

      // Save to localStorage
      localStorage.setItem('auth', 'true');
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      set({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('auth');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      set({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));