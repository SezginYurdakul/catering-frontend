import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Modal from '@/components/common/Modal'
import Pagination from '@/components/common/Pagination'
import employeeService from '@/api/employee.service'
import facilityService from '@/api/facility.service'
import { Employee } from '@/types/employee.types'
import { Facility } from '@/types/facility.types'
import { PaginationMeta } from '@/types/api.types'
import toast from 'react-hot-toast'
import EmployeeForm from './EmployeeForm'

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationMeta>({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1,
  })

  useEffect(() => {
    loadData()
  }, [currentPage])

  const loadData = async () => {
    try {
      setLoading(true)
      const [employeesData, facilitiesData] = await Promise.all([
        employeeService.getEmployees(currentPage, 10),
        facilityService.getFacilities(1, 100), // Get all facilities
      ])
      setEmployees(employeesData.data)
      setPagination(employeesData.pagination)
      setFacilities(facilitiesData.data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const getFacilityNames = (employee: Employee) => {
    const ids = employee.facilityIds || []
    if (ids.length === 0) return 'Unassigned'
    return ids
      .map(id => facilities.find(f => f.id === id)?.name || `ID:${id}`)
      .join(', ')
  }

  const handleCreate = () => {
    setSelectedEmployee(null)
    setIsFormOpen(true)
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsFormOpen(true)
  }

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedEmployee) return

    try {
      setIsDeleting(true)
      await employeeService.deleteEmployee(selectedEmployee.id)
      toast.success('Employee deleted successfully')
      setIsDeleteModalOpen(false)
      loadData()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete employee')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    loadData()
  }

  if (loading) {
    return <LoadingSpinner text="Loading employees..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Employee
        </Button>
      </div>

      <Card>
        {employees.length === 0 ? (
          <EmptyState
            title="No employees yet"
            description="Get started by adding a new employee"
            action={
              <Button onClick={handleCreate}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Employee
              </Button>
            }
          />
        ) : (
          <div>
            {/* Table for md+ screens, cards for mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Facility
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {getFacilityNames(employee)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{employee.address || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(employee)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Card layout for mobile */}
            <div className="md:hidden flex flex-col gap-4">
              {employees.map((employee) => (
                <div key={employee.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-900 text-lg">{employee.name}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Facility:</span> {getFacilityNames(employee)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {employee.address || '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {!loading && employees.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <EmployeeForm
          employee={selectedEmployee}
          facilities={facilities}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Employee"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} isLoading={isDeleting}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
