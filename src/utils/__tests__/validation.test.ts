import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  signUpSchema,
  companySchema,
  projectSchema,
  masterSchema,
  sensorSchema,
} from '../validation'

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: '123456',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123456',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('signUpSchema', () => {
    it('validates correct signup data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        confirmPassword: '123456',
      }

      const result = signUpSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        confirmPassword: '654321',
      }

      const result = signUpSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('companySchema', () => {
    it('validates company data', () => {
      const validData = {
        name: 'Acme Corp',
        description: 'A company',
      }

      const result = companySchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('projectSchema', () => {
    it('validates project data', () => {
      const validData = {
        companyId: '123',
        name: 'Project Alpha',
        status: 'active',
      }

      const result = projectSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid status', () => {
      const invalidData = {
        companyId: '123',
        name: 'Project Alpha',
        status: 'invalid-status',
      }

      const result = projectSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('masterSchema', () => {
    it('validates master device data', () => {
      const validData = {
        name: 'Master Device 1',
        status: 'active',
        location: 'Building A',
      }

      const result = masterSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('sensorSchema', () => {
    it('validates sensor data', () => {
      const validData = {
        masterId: '123',
        name: 'Temperature Sensor',
        type: 'temperature',
        value: 25.5,
        unit: '°C',
      }

      const result = sensorSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })
})