import apiClient from './client'
import { Employee, EmployeeFormData } from '@/types/employee.types'
import { PaginatedResponse } from '@/types/api.types'

export const employeeService = {
  async getEmployees(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Employee>> {
    const response = await apiClient.get<{ data: Employee[], pagination: any }>('/employees', {
      params: { page, per_page: perPage }
    })
    return {
      data: response.data.data,
      pagination: {
        current_page: response.data.pagination.current_page,
        per_page: response.data.pagination.per_page,
        total: response.data.pagination.total_items,
        total_pages: response.data.pagination.total_pages,
      }
    }
  },

  async getEmployeeById(id: number): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/${id}`)
    return response.data
  },

  async getEmployeesByFacility(facilityId: number): Promise<Employee[]> {
    const response = await apiClient.get<{ facility_id: number, employees: Employee[], pagination: any }>(`/facilities/${facilityId}/employees`)
    return response.data.employees
  },

  async createEmployee(data: EmployeeFormData): Promise<Employee> {
    // API expects only facilityIds (camelCase), remove facility_ids from payload
    const { facility_ids, ...rest } = data
    const response = await apiClient.post<Employee>('/employees', {
      ...rest,
      facilityIds: Array.isArray(facility_ids)
        ? facility_ids.map(Number)
        : [],
    })
    return response.data
  },

  async updateEmployee(id: number, data: EmployeeFormData): Promise<Employee> {
    // API expects only facilityIds (camelCase), remove facility_ids from payload
    const { facility_ids, ...rest } = data
    const response = await apiClient.put<Employee>(`/employees/${id}`, {
      ...rest,
      facilityIds: Array.isArray(facility_ids)
        ? facility_ids.map(Number)
        : [],
    })
    return response.data
  },

  async deleteEmployee(id: number): Promise<void> {
    await apiClient.delete(`/employees/${id}`)
  },
}

export default employeeService
