/**
 * Validation Schemas
 * Centralized Zod schemas for form validation
 */

import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Company Schema
export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
});

// Project Schema
export const projectSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'completed']),
});

// Location Schema
export const locationSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  name: z.string().min(2, 'Location name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }).optional(),
});

// User Schema
export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user', 'viewer']),
  companyId: z.string().optional(),
});

// Device Schemas
export const masterSchema = z.object({
  name: z.string().min(2, 'Master name must be at least 2 characters'),
  status: z.enum(['active', 'inactive']),
  location: z.string().min(2, 'Location is required'),
});

export const sensorSchema = z.object({
  masterId: z.string().min(1, 'Master is required'),
  name: z.string().min(2, 'Sensor name must be at least 2 characters'),
  type: z.string().min(2, 'Sensor type is required'),
  value: z.number(),
  unit: z.string().min(1, 'Unit is required'),
});

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type MasterFormData = z.infer<typeof masterSchema>;
export type SensorFormData = z.infer<typeof sensorSchema>;