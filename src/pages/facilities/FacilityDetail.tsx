import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Modal from '@/components/common/Modal'
import facilityService from '@/api/facility.service'
import employeeService from '@/api/employee.service'
import { Facility } from '@/types/facility.types'
import { Employee } from '@/types/employee.types'
import toast from 'react-hot-toast'
import FacilityForm from './FacilityForm'

export default function FacilityDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [facility, setFacility] = useState<Facility | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      loadFacilityData(parseInt(id))
    }
  }, [id])

  const loadFacilityData = async (facilityId: number) => {
    try {
      setLoading(true)
      const [facilityData, employeesData] = await Promise.all([
        facilityService.getFacilityById(facilityId),
        employeeService.getEmployeesByFacility(facilityId),
      ])
      setFacility(facilityData)
      setEmployees(employeesData)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load facility')
      navigate('/facilities')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!facility) return

    try {
      setIsDeleting(true)
      await facilityService.deleteFacility(facility.id)
      toast.success('Facility deleted successfully')
      navigate('/facilities')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete facility')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    if (id) {
      loadFacilityData(parseInt(id))
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading facility..." />
  }

  if (!facility) {
    return null
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/facilities')}>
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{facility.name}</h1>
        <div className="flex gap-3">
          <Button onClick={() => setIsFormOpen(true)}>
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facility Info */}
        <Card title="Facility Information">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Facility Name</label>
              <p className="text-lg font-medium text-gray-900">{facility.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">City</label>
              <p className="text-lg font-medium text-gray-900">{facility.location.city}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <p className="text-gray-900">{facility.location.address}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Zip Code</label>
              <p className="text-gray-900">{facility.location.zip_code}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Country Code</label>
              <p className="text-gray-900">{facility.location.country_code}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <p className="text-gray-900">{facility.location.phone_number}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Tags</label>
              <div className="flex gap-2 flex-wrap mt-2">
                {(facility.tagIds || facility.tags || []).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Employees */}
        <Card title="Employees">
          {employees.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No employees at this facility.</p>
          ) : (
            <div className="space-y-3">
              {employees.map((employee) => (
                <div key={employee.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  {employee.address && (
                    <p className="text-sm text-gray-600">{employee.address}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Edit Form Modal */}
      {isFormOpen && (
        <FacilityForm
          facility={facility}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Facility"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{facility.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
