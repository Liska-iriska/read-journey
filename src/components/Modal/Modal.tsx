import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md'
  children: ReactNode
}

function Modal({ isOpen, onClose, size = 'md', children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('no-scroll')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`${css.modal} ${css[size]}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close"
        >
          <svg className={css.icon} aria-hidden="true">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
