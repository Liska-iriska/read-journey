import { useAuth } from '@/hooks/useAuth'
import css from './UserBar.module.css'

function UserBar() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className={css.bar}>
      <div className={css.avatar} aria-hidden="true">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <span className={css.name}>{user.name}</span>
    </div>
  )
}

export default UserBar
