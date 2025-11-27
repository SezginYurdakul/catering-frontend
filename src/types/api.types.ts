export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface ApiError {
  error: string
  message?: string
  status?: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}
