import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from '@/components/LoginForm/LoginForm'
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import MainLayout from '@/components/MainLayout/MainLayout'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import RestrictedRoute from '@/components/RestrictedRoute/RestrictedRoute'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/AuthLayout/AuthLayout'

const WelcomePage = lazy(() => import('@/components/WelcomePage/WelcomePage'))
const RecommendedPage = lazy(
  () => import('@/components/RecommendedPage/RecommendedPage'),
)
const LibraryPage = lazy(() => import('@/components/LibraryPage/LibraryPage'))
const ReadingPage = lazy(() => import('@/components/ReadingPage/ReadingPage'))

function App() {
  const { isRefreshing } = useAuth()

  if (isRefreshing) return null

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<RestrictedRoute />}>
            <Route path="/" element={<WelcomePage />} />
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

          <Route element={<PrivateRoute redirectTo="/" />}>
            <Route element={<MainLayout />}>
              <Route path="/recommended" element={<RecommendedPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/reading" element={<ReadingPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

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
