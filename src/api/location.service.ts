import apiClient from './client'
import { Location, LocationFormData } from '@/types/location.types'

export const locationService = {
  async getLocations(): Promise<Location[]> {
    const response = await apiClient.get<{ locations: Location[] }>('/locations')
    return response.data.locations
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
