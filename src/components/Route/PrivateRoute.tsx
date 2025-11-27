import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated === undefined) {
    return null // 🔥 Evita el parpadeo antes de que cargue el estado
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' replace />
}
