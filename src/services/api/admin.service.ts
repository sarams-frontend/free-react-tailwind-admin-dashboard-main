/**
 * Admin Service
 * Handles all admin-related API calls (Companies, Projects, Locations, Users)
 */

import { apiClient } from './client';

export interface Company {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
}

export interface Location {
  id: string;
  projectId: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  companyId?: string;
  createdAt: string;
}

export const adminService = {
  // Companies
  getCompanies: () =>
    apiClient.get<Company[]>('/admin/companies'),

  getCompanyById: (id: string) =>
    apiClient.get<Company>(`/admin/companies/${id}`),

  createCompany: (data: Omit<Company, 'id' | 'createdAt'>) =>
    apiClient.post<Company>('/admin/companies', data),

  updateCompany: (id: string, data: Partial<Company>) =>
    apiClient.put<Company>(`/admin/companies/${id}`, data),

  deleteCompany: (id: string) =>
    apiClient.delete(`/admin/companies/${id}`),

  // Projects
  getProjects: () =>
    apiClient.get<Project[]>('/admin/projects'),

  getProjectById: (id: string) =>
    apiClient.get<Project>(`/admin/projects/${id}`),

  getProjectsByCompany: (companyId: string) =>
    apiClient.get<Project[]>(`/admin/companies/${companyId}/projects`),

  createProject: (data: Omit<Project, 'id' | 'createdAt'>) =>
    apiClient.post<Project>('/admin/projects', data),

  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.put<Project>(`/admin/projects/${id}`, data),

  deleteProject: (id: string) =>
    apiClient.delete(`/admin/projects/${id}`),

  // Locations
  getLocations: () =>
    apiClient.get<Location[]>('/admin/locations'),

  getLocationById: (id: string) =>
    apiClient.get<Location>(`/admin/locations/${id}`),

  getLocationsByProject: (projectId: string) =>
    apiClient.get<Location[]>(`/admin/projects/${projectId}/locations`),

  createLocation: (data: Omit<Location, 'id'>) =>
    apiClient.post<Location>('/admin/locations', data),

  updateLocation: (id: string, data: Partial<Location>) =>
    apiClient.put<Location>(`/admin/locations/${id}`, data),

  deleteLocation: (id: string) =>
    apiClient.delete(`/admin/locations/${id}`),

  // Users
  getUsers: () =>
    apiClient.get<User[]>('/admin/users'),

  getUserById: (id: string) =>
    apiClient.get<User>(`/admin/users/${id}`),

  createUser: (data: Omit<User, 'id' | 'createdAt'>) =>
    apiClient.post<User>('/admin/users', data),

  updateUser: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/admin/users/${id}`, data),

  deleteUser: (id: string) =>
    apiClient.delete(`/admin/users/${id}`),
};