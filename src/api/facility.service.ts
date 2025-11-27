import apiClient from './client'
import {
  Facility,
  FacilityFormData,
  FacilitySearchParams,
} from '@/types/facility.types'
import { PaginatedResponse } from '@/types/api.types'

export const facilityService = {
  async getFacilities(
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedResponse<Facility>> {
    const response = await apiClient.get<{ facilities: Facility[], pagination: any }>('/facilities', {
      params: { page, per_page: perPage },
    })
    return {
      data: response.data.facilities,
      pagination: {
        current_page: response.data.pagination.current_page,
        per_page: response.data.pagination.per_page,
        total: response.data.pagination.total_items,
        total_pages: response.data.pagination.total_pages,
      }
    }
  },

  async getFacilityById(id: number): Promise<Facility> {
    const response = await apiClient.get<Facility>(`/facilities/${id}`)
    return response.data
  },

  async searchFacilities(params: FacilitySearchParams): Promise<PaginatedResponse<Facility>> {
    const response = await apiClient.get<{ facilities: Facility[], pagination: any }>('/facilities', {
      params,
    })
    return {
      data: response.data.facilities,
      pagination: {
        current_page: response.data.pagination.current_page,
        per_page: response.data.pagination.per_page,
        total: response.data.pagination.total_items,
        total_pages: response.data.pagination.total_pages,
      }
    }
  },

  async createFacility(data: FacilityFormData): Promise<Facility> {
    const response = await apiClient.post<Facility>('/facilities', data)
    return response.data
  },

  async updateFacility(id: number, data: FacilityFormData): Promise<Facility> {
    const response = await apiClient.put<Facility>(`/facilities/${id}`, data)
    return response.data
  },

  async deleteFacility(id: number): Promise<void> {
    await apiClient.delete(`/facilities/${id}`)
  },
}

export default facilityService
