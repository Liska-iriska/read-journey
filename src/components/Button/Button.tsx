import type { ButtonHTMLAttributes } from 'react'
import css from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined'
  size?: 'md' | 'lg'
}

function Button({
  variant = 'outlined',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${css.button} ${css[variant]} ${css[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
