import apiClient from './client'
import { LoginRequest, LoginResponse } from '@/types/api.types'

export const authService = {
  async login(credentials: LoginRequest): Promise<string> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    const token = response.data.token

    // Store token in localStorage
    localStorage.setItem('auth_token', token)

    return token
  },

  logout(): void {
    localStorage.removeItem('auth_token')
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}

export default authService
