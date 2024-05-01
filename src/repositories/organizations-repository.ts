export type CreateOrganizationData = {
  name: string
  zip_code: string
  address: string
  whatsapp: string
  identity_id: string
}

export type Organization = {
  id: string
  name: string
  zip_code: string
  address: string
  whatsapp: string
  identity_id: string
  created_at: Date
  updated_at: Date
}

export type OrganizationsRepository = {
  create(data: CreateOrganizationData): Promise<Organization>
}
