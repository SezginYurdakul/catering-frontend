import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Pagination from '@/components/common/Pagination'
import Modal from '@/components/common/Modal'
import facilityService from '@/api/facility.service'
import { Facility } from '@/types/facility.types'
import toast from 'react-hot-toast'
import FacilityForm from './FacilityForm'

export default function FacilityList() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadFacilities()
  }, [currentPage])

  const loadFacilities = async () => {
    try {
      setLoading(true)
      const response = await facilityService.getFacilities(currentPage, 10)
      setFacilities(response.data)
      setTotalPages(response.pagination.total_pages)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load facilities')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedFacility(null)
    setIsFormOpen(true)
  }

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility)
    setIsFormOpen(true)
  }

  const handleDelete = (facility: Facility) => {
    setSelectedFacility(facility)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedFacility) return

    try {
      setIsDeleting(true)
      await facilityService.deleteFacility(selectedFacility.id)
      toast.success('Facility deleted successfully')
      setIsDeleteModalOpen(false)
      loadFacilities()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete facility')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    loadFacilities()
  }

  if (loading) {
    return <LoadingSpinner text="Loading facilities..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Facilities</h1>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Facility
        </Button>
      </div>

      <Card>
        {facilities.length === 0 ? (
          <EmptyState
            title="No facilities yet"
            description="Get started by adding a new facility"
            action={
              <Button onClick={handleCreate}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Facility
              </Button>
            }
          />
        ) : (
          <>
            {/* Table for md+ screens, cards for mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Facility Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {facilities.map((facility) => (
                    <tr key={facility.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{facility.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{facility.location.city}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 flex-wrap">
                          {(facility.tagIds || facility.tags || []).map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => navigate(`/facilities/${facility.id}`)}
                            className="text-primary-600 hover:text-primary-900"
                            title="View Details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(facility)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(facility)}
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
              {facilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-900 text-lg">{facility.name}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/facilities/${facility.id}`)}
                        className="text-primary-600 hover:text-primary-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(facility)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(facility)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">City:</span> {facility.location.city}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(facility.tagIds || facility.tags || []).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </Card>

      {/* Form Modal */}
      {isFormOpen && (
        <FacilityForm
          facility={selectedFacility}
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
          Are you sure you want to delete <strong>{selectedFacility?.name}</strong>?
          This action cannot be undone.
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
