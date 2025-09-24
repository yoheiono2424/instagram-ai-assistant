export type IndustryType =
  | 'restaurant'
  | 'beauty'
  | 'apparel'
  | 'realestate'
  | 'medical'

export type BrandTone =
  | 'casual'
  | 'formal'
  | 'professional'
  | 'friendly'

export type UserRole =
  | 'owner'
  | 'admin'
  | 'editor'
  | 'viewer'

export type PostStatus =
  | 'draft'
  | 'scheduled'
  | 'published'
  | 'failed'

export interface User {
  id: string
  email: string
  name?: string
  company?: string
  industry?: IndustryType
  brandTone?: BrandTone
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  userId: string
  content: string
  hashtags: string[]
  imageUrl?: string
  status: PostStatus
  scheduledAt?: string
  publishedAt?: string
  instagramPostId?: string
  createdAt: string
  updatedAt: string
}

export interface AIGeneration {
  id: string
  postId: string
  prompt: string
  generatedContent: string[]
  selectedIndex?: number
  createdAt: string
}