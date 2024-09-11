import { logoutAction } from '@/data/actions/auth-actions'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        <LogOut />
      </button>
    </form>
  )
}
