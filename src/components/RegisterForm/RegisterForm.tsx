import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { registerSchema } from '@/utils/validation'
import css from './RegisterForm.module.css'

function RegisterForm() {
  const { register } = useAuth()

  const { getFieldProps, handleSubmit, touched, errors, isSubmitting } =
    useFormik({
      initialValues: { name: '', email: '', password: '' },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        try {
          await register(values)
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      },
    })

  return (
    <form className={css.form} onSubmit={handleSubmit} noValidate>
      <div className={css.fields}>
        <Input
          label="Name:"
          placeholder="Ilona Ratushniak"
          autoComplete="name"
          {...getFieldProps('name')}
          error={touched.name ? errors.name : undefined}
        />
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
          autoComplete="new-password"
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
          Registration
        </Button>
        <Link to="/login" className={css.link}>
          Already have an account?
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm
