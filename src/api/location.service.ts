import apiClient from './client'
import { Location, LocationFormData } from '@/types/location.types'

export const locationService = {
  async getLocations(page: number = 1, perPage: number = 10): Promise<{ data: Location[], pagination: any }> {
    const response = await apiClient.get<{ locations: Location[], pagination: any }>('/locations', {
      params: { page, per_page: perPage },
    })
    return {
      data: response.data.locations,
      pagination: {
        current_page: response.data.pagination.current_page,
        per_page: response.data.pagination.per_page,
        total: response.data.pagination.total_items,
        total_pages: response.data.pagination.total_pages,
      },
    }
  },

  async getLocationById(id: number): Promise<Location> {
    const response = await apiClient.get<Location>(`/locations/${id}`)
    return response.data
  },

  async createLocation(data: LocationFormData): Promise<Location> {
    const response = await apiClient.post<Location>('/locations', data)
    return response.data
  },

  async updateLocation(id: number, data: LocationFormData): Promise<Location> {
    const response = await apiClient.put<Location>(`/locations/${id}`, data)
    return response.data
  },

  async deleteLocation(id: number): Promise<void> {
    await apiClient.delete(`/locations/${id}`)
  },
}

export default locationService
