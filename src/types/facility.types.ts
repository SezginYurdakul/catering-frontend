import { Location } from './location.types'
import { Tag } from './tag.types'

export interface Facility {
  id: number
  name: string
  location: Location
  tags?: Tag[]
  tagIds?: Tag[]  // Backend returns tagIds instead of tags
  created_at?: string
  creation_date?: string  // Backend returns creation_date
  updated_at?: string
}

export interface FacilityFormData {
  name: string
  location_id: number
  tagIds?: number[]
  tagNames?: string[]
}

export interface FacilitySearchParams {
  query?: string
  filter?: string
  operator?: 'AND' | 'OR'
  page?: number
  per_page?: number
  city?: string
  tag?: string
}
