import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import AppLayout from '@/layout/AppLayout'
import { JSX } from 'react/jsx-runtime'

// Lazy loaded pages
const SignIn = lazy(() => import('@/pages/AuthPages/SignIn'))
const SignUp = lazy(() => import('@/pages/AuthPages/SignUp'))
const Home = lazy(() => import('@/pages/Dashboard/Home'))
const UserProfiles = lazy(() => import('@/pages/UserProfiles'))
const AccountSettings = lazy(() => import('@/pages/AccountSettings'))
const Support = lazy(() => import('@/pages/Support'))
const Users = lazy(() => import('@/pages/Admin/Users'))
const Companies = lazy(() => import('@/pages/Admin/Companies'))
const Locations = lazy(() => import('@/pages/Admin/Locations'))
const Projects = lazy(() => import('@/pages/Admin/Projects'))
const DataHistoryChart = lazy(() => import('@/pages/Charts/DataHistoryChart'))
const TableMaster = lazy(() => import('@/pages/Tables/TableMaster/TableMaster'))
const TableSensor = lazy(() => import('@/pages/Tables/TableSensor/TableSensor'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
)

// Protected route component
function ProtectedRoute({ element }: { element: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? element : <Navigate to='/signin' />
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Redirigir la raíz (/) a /dashboard */}
            <Route path='/' element={<Navigate to='/dashboard' />} />

            {/* Dashboard Layout con rutas protegidas */}
            <Route element={<AppLayout />}>
              {/* Dashboard */}
              <Route
                path='/dashboard'
                element={<ProtectedRoute element={<Home />} />}
              />

              {/* Devices */}
              <Route
                path='/devices/masters'
                element={<ProtectedRoute element={<TableMaster />} />}
              />
              <Route
                path='/devices/sensors'
                element={<ProtectedRoute element={<TableSensor />} />}
              />

              {/* Data */}
              <Route
                path='/data/historical'
                element={<ProtectedRoute element={<DataHistoryChart />} />}
              />

              {/* Admin */}
              <Route
                path='/admin/companies'
                element={<ProtectedRoute element={<Companies />} />}
              />
              <Route
                path='/admin/projects'
                element={<ProtectedRoute element={<Projects />} />}
              />
              <Route
                path='/admin/locations'
                element={<ProtectedRoute element={<Locations />} />}
              />
              <Route
                path='/admin/users'
                element={<ProtectedRoute element={<Users />} />}
              />

              {/* Legacy routes for compatibility */}
              <Route path='/Dashboard/Home' element={<Navigate to='/dashboard' />} />
              <Route path='/table-one' element={<Navigate to='/devices/masters' />} />
              <Route path='/table-two' element={<Navigate to='/devices/sensors' />} />
              <Route path='/alerts' element={<Navigate to='/admin/companies' />} />
              <Route path='/avatars' element={<Navigate to='/admin/projects' />} />
              <Route path='/badge' element={<Navigate to='/admin/locations' />} />
              <Route path='/videos' element={<Navigate to='/admin/users' />} />
              <Route path='/line-chart' element={<Navigate to='/data/historical' />} />

              {/* Other routes */}
              <Route
                path='/profile'
                element={<ProtectedRoute element={<UserProfiles />} />}
              />
              <Route
                path='/settings'
                element={<ProtectedRoute element={<AccountSettings />} />}
              />
              <Route
                path='/support'
                element={<ProtectedRoute element={<Support />} />}
              />
            </Route>

            {/* Auth Layout (Rutas sin protección) */}
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}