/**
 * Devices Service
 * Handles all device-related API calls (Masters & Sensors)
 */

import { apiClient } from './client';

export interface Master {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  location: string;
  createdAt: string;
}

export interface Sensor {
  id: string;
  masterId: string;
  name: string;
  type: string;
  value: number;
  unit: string;
  lastUpdate: string;
}

export const devicesService = {
  // Masters
  getMasters: () =>
    apiClient.get<Master[]>('/devices/masters'),

  getMasterById: (id: string) =>
    apiClient.get<Master>(`/devices/masters/${id}`),

  createMaster: (data: Omit<Master, 'id' | 'createdAt'>) =>
    apiClient.post<Master>('/devices/masters', data),

  updateMaster: (id: string, data: Partial<Master>) =>
    apiClient.put<Master>(`/devices/masters/${id}`, data),

  deleteMaster: (id: string) =>
    apiClient.delete(`/devices/masters/${id}`),

  // Sensors
  getSensors: () =>
    apiClient.get<Sensor[]>('/devices/sensors'),

  getSensorById: (id: string) =>
    apiClient.get<Sensor>(`/devices/sensors/${id}`),

  getSensorsByMaster: (masterId: string) =>
    apiClient.get<Sensor[]>(`/devices/masters/${masterId}/sensors`),

  createSensor: (data: Omit<Sensor, 'id' | 'lastUpdate'>) =>
    apiClient.post<Sensor>('/devices/sensors', data),

  updateSensor: (id: string, data: Partial<Sensor>) =>
    apiClient.put<Sensor>(`/devices/sensors/${id}`, data),

  deleteSensor: (id: string) =>
    apiClient.delete(`/devices/sensors/${id}`),
};