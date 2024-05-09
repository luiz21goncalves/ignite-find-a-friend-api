export type CreatePetData = {
  about: string
  age: string
  dependency: string
  kind: string
  name: string
  size: string
  space: string
  organization_id: string
}

export type Pet = {
  about: string
  age: string
  dependency: string
  kind: string
  name: string
  size: string
  space: string
  organization_id: string
  created_at: Date
  updated_at: Date
}

export type PetsRepository = {
  create(data: CreatePetData): Promise<Pet>
}
