import { prisma } from '@/lib/prisma'

import {
  CreateOrganizationData,
  Organization,
  OrganizationsRepository,
} from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create({
    address,
    identity_id,
    name,
    whatsapp,
    zip_code,
  }: CreateOrganizationData): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        address,
        identity_id,
        name,
        whatsapp,
        zip_code,
      },
    })

    return organization
  }
}
