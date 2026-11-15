import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface RestrictedRouteProps {
  redirectTo?: string
}

function RestrictedRoute({
  redirectTo = '/recommended',
}: RestrictedRouteProps) {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />
}

export default RestrictedRoute
