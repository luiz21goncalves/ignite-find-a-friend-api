export type CreateIdentityData = {
  email: string
  password_hash: string
}

export type Identity = {
  id: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

export type IdentitiesRepository = {
  create(data: CreateIdentityData): Promise<Identity>
  findByEmail(email: string): Promise<Identity | null>
  findById(id: string): Promise<Identity | null>
}
