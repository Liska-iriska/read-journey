import type { ReactNode } from 'react'
import Modal from '@/components/Modal/Modal'
import css from './InfoModal.module.css'

interface InfoModalProps {
  isOpen: boolean
  emoji: string
  title: string
  onClose: () => void
  children: ReactNode
}

function InfoModal({
  isOpen,
  emoji,
  title,
  onClose,
  children,
}: InfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className={css.content}>
        <span className={css.emoji} aria-hidden="true">
          {emoji}
        </span>
        <h2 className={css.title}>{title}</h2>
        <p className={css.text}>{children}</p>
      </div>
    </Modal>
  )
}

export default InfoModal
