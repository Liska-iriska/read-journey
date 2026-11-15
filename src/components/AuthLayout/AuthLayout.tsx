import type { ReactNode } from 'react'
import css from './AuthLayout.module.css'

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className={css.page}>
      <section className={css.card}>
        <div className={css.logo}>
          <svg className={css.logoIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-logo" />
          </svg>
          <span className={css.logoText}>Read Journey</span>
        </div>

        <h1 className={css.title}>
          Expand your mind, reading <span className={css.muted}>a book</span>
        </h1>

        {children}
      </section>
    </main>
  )
}

export default AuthLayout
