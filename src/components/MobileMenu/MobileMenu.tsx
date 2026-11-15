import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import css from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return

    const media = window.matchMedia('(min-width: 768px)')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    media.addEventListener('change', handleResize)
    document.body.classList.add('no-scroll')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      media.removeEventListener('change', handleResize)
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
      <aside className={css.panel} role="dialog" aria-modal="true">
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg className={css.icon} aria-hidden="true">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        <div className={css.content}>{children}</div>
      </aside>
    </div>,
    document.body,
  )
}

export default MobileMenu
