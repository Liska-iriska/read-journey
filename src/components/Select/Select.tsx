import { useEffect, useRef, useState } from 'react'
import css from './Select.module.css'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function Select({ options, value, onChange, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selected = options.find((option) => option.value === value)

  const handleSelect = (newValue: string) => {
    onChange(newValue)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className={`${css.select} ${className}`}>
      <button
        type="button"
        className={css.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected?.label}</span>
        <svg
          className={`${css.icon} ${isOpen ? css.iconOpen : ''}`}
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                type="button"
                className={`${css.option} ${option.value === value ? css.active : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
