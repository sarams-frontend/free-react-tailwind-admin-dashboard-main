# Guía de Migración a React Hook Form + Zod

## Ejemplo: Migración del SignInForm

### Antes (Sin React Hook Form)

```typescript
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault()
  // Validación manual
  if (email === 'admin@example.com' && password === '123456') {
    login()
    navigate('/dashboard')
  } else {
    alert('Credenciales incorrectas')
  }
}

return (
  <form onSubmit={handleLogin}>
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    {/* Sin validación visible */}
  </form>
)
```

### Después (Con React Hook Form + Zod)

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/utils/validation'

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
})

const onSubmit = async (data: LoginFormData) => {
  try {
    // data ya está validado por Zod
    await login(data) // Llama al authStore con credentials
    navigate('/dashboard')
  } catch (error) {
    // Error manejado por el store
  }
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Input
      type="email"
      {...register('email')}
    />
    {errors.email && (
      <p className="text-red-600">{errors.email.message}</p>
    )}
  </form>
)
```

## Beneficios de la Migración

1. **Validación Automática:** Zod valida el formulario antes de enviar
2. **TypeScript Type-Safe:** Los datos están tipados automáticamente
3. **Mensajes de Error:** Zod proporciona mensajes claros
4. **Menos Código:** No necesitas useState para cada campo
5. **Performance:** React Hook Form usa refs (no re-renders)

## Pasos para Migrar Cualquier Formulario

### 1. Crear Schema de Validación (si no existe)

```typescript
// src/utils/validation.ts
export const myFormSchema = z.object({
  field1: z.string().min(2, 'Mínimo 2 caracteres'),
  field2: z.string().email('Email inválido'),
  // ...más campos
})

export type MyFormData = z.infer<typeof myFormSchema>
```

### 2. Reemplazar useState con useForm

```typescript
// Antes
const [field1, setField1] = useState('')
const [field2, setField2] = useState('')

// Después
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<MyFormData>({
  resolver: zodResolver(myFormSchema),
})
```

### 3. Actualizar Event Handler

```typescript
// Antes
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // validación manual
}

// Después
const onSubmit = async (data: MyFormData) => {
  // data ya validado
}
```

### 4. Actualizar Inputs

```typescript
// Antes
<Input
  value={field1}
  onChange={(e) => setField1(e.target.value)}
/>

// Después
<Input {...register('field1')} />
{errors.field1 && <span>{errors.field1.message}</span>}
```

## Formularios a Migrar en el Proyecto

- [ ] SignInForm.tsx
- [ ] SignUpForm.tsx
- [ ] Formularios en páginas Admin (Companies, Projects, Locations, Users)
- [ ] Formularios de tablas (AddRow components)

## Referencia Rápida

### Tipos de Validación Común

```typescript
// String
z.string()
  .min(2, 'Mínimo 2 caracteres')
  .max(50, 'Máximo 50 caracteres')

// Email
z.string().email('Email inválido')

// Number
z.number()
  .min(0, 'Debe ser positivo')
  .max(100, 'Máximo 100')

// Optional
z.string().optional()

// Enum
z.enum(['active', 'inactive'])

// Custom Validation
z.string().refine((val) => val !== 'admin', {
  message: 'No puede ser admin',
})
```

### Hooks Útiles

```typescript
// Valores por defecto
useForm({
  defaultValues: {
    email: '',
    password: '',
  },
})

// Reset form
const { reset } = useForm()
reset()

// Set specific value
const { setValue } = useForm()
setValue('email', 'new@email.com')

// Watch specific field
const { watch } = useForm()
const emailValue = watch('email')
```

## Integración con AuthStore

```typescript
const login = useAuthStore((state) => state.login)
const isLoading = useAuthStore((state) => state.isLoading)
const error = useAuthStore((state) => state.error)

const onSubmit = async (data: LoginFormData) => {
  try {
    await login(data) // Ahora acepta { email, password }
    navigate('/dashboard')
  } catch (err) {
    // error ya está en el store
  }
}

// Mostrar loading
<Button disabled={isLoading}>
  {isLoading ? 'Signing in...' : 'Sign In'}
</Button>

// Mostrar error del store
{error && <div className="error">{error}</div>}
```

## Testing de Formularios (Próximo Paso)

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('valida email', async () => {
  render(<SignInForm />)

  const emailInput = screen.getByLabelText(/email/i)
  await userEvent.type(emailInput, 'invalid')

  await waitFor(() => {
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
  })
})
```

---

**Nota:** Para aplicar estos cambios, sigue esta guía paso a paso en cada formulario del proyecto.