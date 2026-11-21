import { Link } from 'react-router-dom'
import css from './WelcomePage.module.css'

function WelcomePage() {
  return (
    <main className={css.page}>
      <section className={css.card}>
        <div className={css.logo}>
          <svg className={css.logoIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-logo" />
          </svg>
          <span className={css.logoText}>Read Journey</span>
        </div>

        <div className={css.content}>
          <h1 className={css.title}>
            Expand your mind, reading <span className={css.muted}>a book</span>
          </h1>
          <p className={css.text}>
            Build your personal library, discover recommended books and track
            every reading session in one place.
          </p>

          <div className={css.actions}>
            <Link to="/register" className={`${css.link} ${css.filled}`}>
              Registration
            </Link>
            <Link to="/login" className={css.link}>
              Log in
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default WelcomePage
