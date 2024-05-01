import { IdentitiesRepository } from '@/repositories/identities-repository'
import {
  Organization,
  OrganizationsRepository,
} from '@/repositories/organizations-repository'

import { IdentityNotFoundError } from './errors/identity-not-found-error'

type CreateOrganizationUseCaseRequest = {
  name: string
  zip_code: string
  address: string
  whatsapp: string
  identity_id: string
}

type CreateOrganizationUseCaseResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly identitiesRepository: IdentitiesRepository,
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    address,
    name,
    whatsapp,
    zip_code,
    identity_id,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const identity = await this.identitiesRepository.findById(identity_id)

    if (!identity) {
      throw new IdentityNotFoundError()
    }

    const organization = await this.organizationsRepository.create({
      address,
      identity_id,
      name,
      whatsapp,
      zip_code,
    })

    return { organization }
  }
}
