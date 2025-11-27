export interface Location {
  id: number
  city: string
  address: string
  zip_code: string
  country_code: string
  phone_number: string
  created_at?: string
  updated_at?: string
}

export interface LocationFormData {
  city: string
  address: string
  zip_code: string
  country_code: string
  phone_number: string
}
