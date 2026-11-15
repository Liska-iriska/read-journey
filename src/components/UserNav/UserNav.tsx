import { NavLink } from 'react-router-dom'
import css from './UserNav.module.css'

interface UserNavProps {
  vertical?: boolean
  onNavigate?: () => void
}

const links = [
  { to: '/recommended', label: 'Home' },
  { to: '/library', label: 'My library' },
]

function UserNav({ vertical = false, onNavigate }: UserNavProps) {
  return (
    <nav aria-label="Main">
      <ul className={`${css.list} ${vertical ? css.vertical : ''}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.active : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default UserNav
