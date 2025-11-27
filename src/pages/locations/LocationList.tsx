import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Modal from '@/components/common/Modal'
import locationService from '@/api/location.service'
import { Location } from '@/types/location.types'
import toast from 'react-hot-toast'
import LocationForm from './LocationForm'

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadLocations()
  }, [])

  const loadLocations = async () => {
    try {
      setLoading(true)
      const data = await locationService.getLocations()
      setLocations(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load locations')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedLocation(null)
    setIsFormOpen(true)
  }

  const handleEdit = (location: Location) => {
    setSelectedLocation(location)
    setIsFormOpen(true)
  }

  const handleDelete = (location: Location) => {
    setSelectedLocation(location)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedLocation) return

    try {
      setIsDeleting(true)
      await locationService.deleteLocation(selectedLocation.id)
      toast.success('Location deleted successfully')
      setIsDeleteModalOpen(false)
      loadLocations()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete location')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    loadLocations()
  }

  if (loading) {
    return <LoadingSpinner text="Loading locations..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Location
        </Button>
      </div>

      <Card>
        {locations.length === 0 ? (
          <EmptyState
            title="No locations yet"
            description="Get started by adding a new location"
            action={
              <Button onClick={handleCreate}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Location
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zip Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {locations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{location.city}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{location.zip_code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{location.phone_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(location)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(location)}
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
              {locations.map((location) => (
                <div key={location.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-900 text-lg">{location.city}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(location)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {location.address}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Zip Code:</span> {location.zip_code}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {location.phone_number}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Form Modal */}
      {isFormOpen && (
        <LocationForm
          location={selectedLocation}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Location"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{selectedLocation?.city}</strong>?
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
