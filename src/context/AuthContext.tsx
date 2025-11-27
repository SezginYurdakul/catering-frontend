import { createContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '@/api/auth.service'
import { LoginRequest } from '@/types/api.types'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on mount
    const token = authService.getToken()
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const login = async (credentials: LoginRequest) => {
    await authService.login(credentials)
    setIsAuthenticated(true)
  }

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
