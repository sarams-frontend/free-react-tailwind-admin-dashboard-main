import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore' // Importa Zustand
import PageMeta from '@/components/common/PageMeta'
import AuthLayout from './AuthPageLayout'
import SignInForm from '@/components/auth/SignInForm'

export default function SignIn() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard/Home') // Si ya está autenticado, redirige automáticamente
    }
  }, [isAuthenticated, navigate])

  return (
    <>
      <PageMeta
        title='Snsorial - SignIn'
        description='Dashboard for Snsorial'
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  )
}
