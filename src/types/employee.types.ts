export interface Employee {
  id: number
  name: string
  address?: string
  phone?: string
  email?: string
  created_at?: string
  facilityIds?: number[]
}

export interface EmployeeFormData {
  name: string
  facility_ids: number[]
  address?: string
  email?: string
  phone?: string
}
