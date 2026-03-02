export interface AuthUser {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN'
  tier: 'FREE' | 'PRO' | 'ENTERPRISE'
}

export interface AuthSession {
  user: AuthUser
  expires: string
}
