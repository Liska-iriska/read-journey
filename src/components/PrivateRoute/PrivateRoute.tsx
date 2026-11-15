import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface PrivateRouteProps {
  redirectTo?: string
}

function PrivateRoute({ redirectTo = '/login' }: PrivateRouteProps) {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export default PrivateRoute
