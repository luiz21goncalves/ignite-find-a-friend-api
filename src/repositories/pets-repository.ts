export type CreatePetData = {
  about: string
  age: string
  dependency: string
  kind: string
  name: string
  size: string
  space: string
  energy: string
  organization_id: string
}

export type FetchPetsFilters = {
  age?: string
  dependency?: string
  energy?: string
  kind?: string
  size?: string
  space?: string
  zip_code: string
}

export type Pet = {
  about: string
  age: string
  dependency: string
  kind: string
  name: string
  size: string
  energy: string
  space: string
  organization_id: string
  created_at: Date
  updated_at: Date
}

export type PetsRepository = {
  create(data: CreatePetData): Promise<Pet>
  fetchPets(data: FetchPetsFilters): Promise<Pet[]>
}
