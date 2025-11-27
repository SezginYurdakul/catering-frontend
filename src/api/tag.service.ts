import apiClient from './client'
import { Tag, TagFormData } from '@/types/tag.types'

export const tagService = {
  async getTags(): Promise<Tag[]> {
    const response = await apiClient.get<{ tags: Tag[] }>('/tags')
    return response.data.tags
  },

  async getTagById(id: number): Promise<Tag> {
    const response = await apiClient.get<Tag>(`/tags/${id}`)
    return response.data
  },

  async createTag(data: TagFormData): Promise<Tag> {
    const response = await apiClient.post<Tag>('/tags', data)
    return response.data
  },

  async updateTag(id: number, data: TagFormData): Promise<Tag> {
    const response = await apiClient.put<Tag>(`/tags/${id}`, data)
    return response.data
  },

  async deleteTag(id: number): Promise<void> {
    await apiClient.delete(`/tags/${id}`)
  },
}

export default tagService
