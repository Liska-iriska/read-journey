import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Button from '@/components/Button/Button'
import MobileMenu from '@/components/MobileMenu/MobileMenu'
import UserNav from '@/components/UserNav/UserNav'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/utils/getErrorMessage'
import css from './Header.module.css'

function Header() {
  const { user, logOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logOut().catch((error) => toast.error(getErrorMessage(error)))
  }

  return (
    <header className={css.header}>
      <Link to="/recommended" className={css.logo} aria-label="Read Journey">
        <svg className={css.logoIcon} aria-hidden="true">
          <use href="/sprite.svg#icon-logo" />
        </svg>
        <span className={css.logoText}>Read Journey</span>
      </Link>

      <div className={css.nav}>
        <UserNav />
      </div>

      <div className={css.user}>
        <div className={css.avatar} title={user?.name}>
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <Button className={css.logout} onClick={handleLogout}>
          Log out
        </Button>
        <button
          type="button"
          className={css.burger}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className={css.burgerIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-burger" />
          </svg>
        </button>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu}>
        <UserNav vertical onNavigate={closeMenu} />
        <Button onClick={handleLogout}>Log out</Button>
      </MobileMenu>
    </header>
  )
}

export default Header
