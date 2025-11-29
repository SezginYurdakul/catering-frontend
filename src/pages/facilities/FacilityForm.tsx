import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import facilityService from '@/api/facility.service'
import locationService from '@/api/location.service'
import tagService from '@/api/tag.service'
import { Facility, FacilityFormData } from '@/types/facility.types'
import { Location } from '@/types/location.types'
import { Tag } from '@/types/tag.types'
import toast from 'react-hot-toast'

interface FacilityFormProps {
  facility: Facility | null
  onSuccess: () => void
  onCancel: () => void
}

export default function FacilityForm({ facility, onSuccess, onCancel }: FacilityFormProps) {
  const [locations, setLocations] = useState<Location[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilityFormData>({
    defaultValues: facility
      ? {
          name: facility.name,
          location_id: facility.location.id,
        }
      : undefined,
  })

  useEffect(() => {
    loadFormData()
  }, [])

  useEffect(() => {
    if (facility) {
      const tags = facility.tagIds || facility.tags || []
      setSelectedTags(tags.map((t) => t.id))
    }
  }, [facility])

  const loadFormData = async () => {
    try {
      const [locationsResult, tagsData] = await Promise.all([
        locationService.getLocations(),
        tagService.getTags(),
      ])
      setLocations(locationsResult.data)
      setTags(tagsData)
    } catch (error: any) {
      toast.error('Failed to load form data')
    }
  }

  const onSubmit = async (data: FacilityFormData) => {
    try {
      setIsSubmitting(true)
      const formData = {
        ...data,
        tagIds: selectedTags,
      }

      if (facility) {
        await facilityService.updateFacility(facility.id, formData)
        toast.success('Facility updated successfully')
      } else {
        await facilityService.createFacility(formData)
        toast.success('Facility created successfully')
      }

      onSuccess()
    } catch (error: any) {
      toast.error(error.message || 'Operation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={facility ? 'Edit Facility' : 'New Facility'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Facility Name"
          {...register('name', { required: 'Facility name is required' })}
          error={errors.name?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <select
            {...register('location_id', { required: 'Location is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city}
              </option>
            ))}
          </select>
          {errors.location_id && (
            <p className="mt-1 text-sm text-red-600">{errors.location_id.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {facility ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
