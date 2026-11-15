import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { loginSchema } from '@/utils/validation'
import css from './LoginForm.module.css'

function LoginForm() {
  const { logIn } = useAuth()

  const { getFieldProps, handleSubmit, touched, errors, isSubmitting } =
    useFormik({
      initialValues: { email: '', password: '' },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          await logIn(values)
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      },
    })

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.fields}>
        <Input
          label="Mail:"
          type="email"
          placeholder="Your@email.com"
          autoComplete="email"
          {...getFieldProps('email')}
          error={touched.email ? errors.email : undefined}
        />
        <Input
          label="Password:"
          type="password"
          placeholder="Yourpasswordhere"
          autoComplete="current-password"
          {...getFieldProps('password')}
          error={touched.password ? errors.password : undefined}
          success={
            touched.password && !errors.password
              ? 'Password is secure'
              : undefined
          }
        />
      </div>

      <div className={css.actions}>
        <Button
          type="submit"
          variant="filled"
          size="lg"
          disabled={isSubmitting}
        >
          Log In
        </Button>
        <Link to="/register" className={css.link}>
          Don’t have an account?
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
