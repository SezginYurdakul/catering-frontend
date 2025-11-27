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

export default function EmployeeForm({
  employee,
  facilities,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)


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
      const formData = {
        ...data,
        facility_ids: selectedFacilities,
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

        <Input label="Address" {...register('address')} />

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
