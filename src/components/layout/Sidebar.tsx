import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Facilities', href: '/facilities', icon: BuildingOfficeIcon },
  { name: 'Locations', href: '/locations', icon: MapPinIcon },
  { name: 'Tags', href: '/tags', icon: TagIcon },
  { name: 'Employees', href: '/employees', icon: UserGroupIcon },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
