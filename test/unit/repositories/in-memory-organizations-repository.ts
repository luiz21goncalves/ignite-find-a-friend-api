import { randomUUID } from 'node:crypto'

import {
  CreateOrganizationData,
  Organization,
  OrganizationsRepository,
} from '@/repositories/organizations-repository'

export class InMemoryOrganizationsRepositories
  implements OrganizationsRepository
{
  private readonly data: Organization[]

  constructor() {
    this.data = []
  }

  async create({
    address,
    identity_id,
    name,
    whatsapp,
    zip_code,
  }: CreateOrganizationData): Promise<Organization> {
    const organization = {
      address,
      created_at: new Date(),
      id: randomUUID(),
      identity_id,
      name,
      updated_at: new Date(),
      whatsapp,
      zip_code,
    } satisfies Organization

    this.data.push(organization)

    return organization
  }
}
