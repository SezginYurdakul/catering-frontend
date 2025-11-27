import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import employeeService from '@/api/employee.service'
import { Employee, EmployeeFormData } from '@/types/employee.types'
import { Facility } from '@/types/facility.types'
import toast from 'react-hot-toast'

interface EmployeeFormProps {
  employee: Employee | null
  facilities: Facility[]
  onSuccess: () => void
  onCancel: () => void
}

interface AddressFields {
  street: string
  houseNumber: string
  postcode: string
  city: string
  country: string
}

// Parse address string into separate fields
const parseAddress = (address?: string): AddressFields => {
  if (!address) {
    return { street: '', houseNumber: '', postcode: '', city: '', country: '' }
  }

  // Format: "Street HouseNumber, Postcode City, Country"
  const parts = address.split(',').map(p => p.trim())

  if (parts.length >= 3) {
    const streetParts = parts[0].split(' ')
    const houseNumber = streetParts.pop() || ''
    const street = streetParts.join(' ')

    const cityParts = parts[1].split(' ')
    const postcode = cityParts[0] || ''
    const city = cityParts.slice(1).join(' ')

    const country = parts[2] || ''

    return { street, houseNumber, postcode, city, country }
  }

  return { street: '', houseNumber: '', postcode: '', city: '', country: '' }
}

export default function EmployeeForm({
  employee,
  facilities,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addressFields, setAddressFields] = useState<AddressFields>(
    parseAddress(employee?.address)
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormData>({
    defaultValues: employee
      ? {
          ...employee,
          facility_ids: employee.facilityIds || [],
        }
      : { facility_ids: [] },
  })

  // Checkbox ile facility seçimini manuel yönet
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>(
    employee?.facilityIds || []
  )

  // Form submit öncesi facility_ids değerini güncelle
  useEffect(() => {
    setValue('facility_ids', selectedFacilities)
  }, [selectedFacilities, setValue])

  const onFacilityChange = (facilityId: number) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId]
    )
  }

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsSubmitting(true)

      // Combine address fields
      const address = [
        `${addressFields.street} ${addressFields.houseNumber}`.trim(),
        `${addressFields.postcode} ${addressFields.city}`.trim(),
        addressFields.country
      ]
        .filter(part => part)
        .join(', ')

      const formData = {
        ...data,
        facility_ids: selectedFacilities,
        address: address || undefined,
      }

      if (employee) {
        await employeeService.updateEmployee(employee.id, formData)
        toast.success('Employee updated successfully')
      } else {
        await employeeService.createEmployee(formData)
        toast.success('Employee created successfully')
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
      title={employee ? 'Edit Employee' : 'New Employee'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facilities <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50">
            {facilities.map((facility) => (
              <label key={facility.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility.id)}
                  onChange={() => onFacilityChange(facility.id)}
                  className="accent-primary-500"
                />
                <span>{facility.name}</span>
              </label>
            ))}
          </div>
          {selectedFacilities.length === 0 && (
            <p className="mt-1 text-sm text-red-600">At least one facility is required</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Street Name"
            value={addressFields.street}
            onChange={(e) => setAddressFields({ ...addressFields, street: e.target.value })}
          />
          <Input
            label="House Number"
            value={addressFields.houseNumber}
            onChange={(e) => setAddressFields({ ...addressFields, houseNumber: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Postcode"
            value={addressFields.postcode}
            onChange={(e) => setAddressFields({ ...addressFields, postcode: e.target.value })}
          />
          <Input
            label="City"
            value={addressFields.city}
            onChange={(e) => setAddressFields({ ...addressFields, city: e.target.value })}
          />
        </div>

        <Input
          label="Country"
          value={addressFields.country}
          onChange={(e) => setAddressFields({ ...addressFields, country: e.target.value })}
        />

        <Input label="Email" type="email" {...register('email')} />

        <Input label="Phone" type="tel" {...register('phone')} />

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {employee ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
