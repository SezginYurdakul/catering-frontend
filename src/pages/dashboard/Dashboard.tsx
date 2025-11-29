import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BuildingOfficeIcon,
  MapPinIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import facilityService from '@/api/facility.service'
import locationService from '@/api/location.service'
import tagService from '@/api/tag.service'
import employeeService from '@/api/employee.service'
import { Facility } from '@/types/facility.types'

interface Stats {
  facilities: number
  locations: number
  tags: number
  employees: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ facilities: 0, locations: 0, tags: 0, employees: 0 })
  const [recentFacilities, setRecentFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [facilitiesData, locationsData, tags, employeesData] = await Promise.all([
        facilityService.getFacilities(1, 5).catch(() => ({ data: [], pagination: { total: 0 } })),
        locationService.getLocations(1, 5).catch(() => ({ data: [], pagination: { total: 0 } })),
        tagService.getTags().catch(() => []),
        employeeService.getEmployees(1, 10).catch(() => ({ data: [], pagination: { total: 0 } })),
      ])

      setStats({
        facilities: facilitiesData?.pagination?.total || 0,
        locations: locationsData?.pagination?.total || 0,
        tags: tags?.length || 0,
        employees: employeesData?.pagination?.total || 0,
      })

      setRecentFacilities(facilitiesData?.data || [])
    } catch (error) {
      console.error('Dashboard data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: 'Facilities', value: stats.facilities, icon: BuildingOfficeIcon, color: 'text-blue-600', route: '/facilities' },
    { name: 'Locations', value: stats.locations, icon: MapPinIcon, color: 'text-green-600', route: '/locations' },
    { name: 'Tags', value: stats.tags, icon: TagIcon, color: 'text-purple-600', route: '/tags' },
    { name: 'Employees', value: stats.employees, icon: UserGroupIcon, color: 'text-orange-600', route: '/employees' },
  ]

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card
            key={stat.name}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.route)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`h-12 w-12 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Facilities */}
      <Card title="Recently Added Facilities">
        {recentFacilities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No facilities added yet.</p>
        ) : (
          <div className="space-y-4">
            {recentFacilities.map((facility) => (
              <div
                key={facility.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{facility.name}</h4>
                  <p className="text-sm text-gray-600">{facility.location.city}</p>
                </div>
                <div className="flex gap-2">
                  {(facility.tagIds || facility.tags || []).map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
