import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'

// Layout
import Layout from '@/components/layout/Layout'

// Pages
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/dashboard/Dashboard'
import FacilityList from '@/pages/facilities/FacilityList'
import FacilityDetail from '@/pages/facilities/FacilityDetail'
import LocationList from '@/pages/locations/LocationList'
import TagList from '@/pages/tags/TagList'
import EmployeeList from '@/pages/employees/EmployeeList'

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="facilities" element={<FacilityList />} />
        <Route path="facilities/:id" element={<FacilityDetail />} />
        <Route path="locations" element={<LocationList />} />
        <Route path="tags" element={<TagList />} />
        <Route path="employees" element={<EmployeeList />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
