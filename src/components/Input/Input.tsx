import { useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import css from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: string
}

function Input({
  label,
  error,
  success,
  type = 'text',
  className = '',
  ...props
}: InputProps) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)

  const isPassword = type === 'password'
  const status = error ? 'error' : success ? 'success' : null
  const message = error || success
  const messageId = `${id}-message`

  return (
    <div className={`${css.wrapper} ${className}`}>
      <div className={`${css.field} ${status ? css[status] : ''}`}>
        <label htmlFor={id} className={css.label}>
          {label}
        </label>
        <input
          id={id}
          className={css.input}
          type={isPassword && isVisible ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={message ? messageId : undefined}
          {...props}
        />

        {status ? (
          <svg className={`${css.icon} ${css[status]}`} aria-hidden="true">
            <use href={`/sprite.svg#icon-${status}`} />
          </svg>
        ) : (
          isPassword && (
            <button
              type="button"
              className={css.toggle}
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
              <svg className={css.icon} aria-hidden="true">
                <use
                  href={`/sprite.svg#icon-${isVisible ? 'eye' : 'eye-off'}`}
                />
              </svg>
            </button>
          )
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={`${css.message} ${status ? css[status] : ''}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default Input