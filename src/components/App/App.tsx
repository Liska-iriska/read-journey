import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from '@/components/LoginForm/LoginForm'
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import RestrictedRoute from '@/components/RestrictedRoute/RestrictedRoute'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Header/Header'
import AuthLayout from '@/components/AuthLayout/AuthLayout'

function App() {
  const { isLoggedIn, isRefreshing } = useAuth()

  if (isRefreshing) return null

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route element={<RestrictedRoute />}>
          <Route
            path="/register"
            element={
              <AuthLayout>
                <RegisterForm />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
        </Route>

        <Route element={<PrivateRoute redirectTo="/register" />}></Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface-3)',
            color: 'var(--color-white)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </>
  )
}

export default App
