import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import locationService from '@/api/location.service'
import { Location, LocationFormData } from '@/types/location.types'
import toast from 'react-hot-toast'

interface LocationFormProps {
  location: Location | null
  onSuccess: () => void
  onCancel: () => void
}

export default function LocationForm({ location, onSuccess, onCancel }: LocationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    defaultValues: location || undefined,
  })

  const onSubmit = async (data: LocationFormData) => {
    try {
      setIsSubmitting(true)

      if (location) {
        await locationService.updateLocation(location.id, data)
        toast.success('Location updated successfully')
      } else {
        await locationService.createLocation(data)
        toast.success('Location created successfully')
      }

      onSuccess()
    } catch (error: any) {
      toast.error(error.message || 'Operation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={location ? 'Edit Location' : 'New Location'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="City"
          {...register('city', { required: 'City is required' })}
          error={errors.city?.message}
        />

        <Input
          label="Address"
          {...register('address', { required: 'Address is required' })}
          error={errors.address?.message}
        />

        <Input
          label="Zip Code"
          {...register('zip_code', { required: 'Zip code is required' })}
          error={errors.zip_code?.message}
        />

        <Input
          label="Country Code"
          {...register('country_code', { required: 'Country code is required' })}
          error={errors.country_code?.message}
        />

        <Input
          label="Phone"
          type="tel"
          {...register('phone_number', { required: 'Phone number is required' })}
          error={errors.phone_number?.message}
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {location ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
