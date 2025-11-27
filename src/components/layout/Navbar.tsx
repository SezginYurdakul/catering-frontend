import { useNavigate } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import Button from '../common/Button'

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Catering Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
