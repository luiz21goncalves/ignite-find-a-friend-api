import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Pet, PetsRepository } from '@/repositories/pets-repository'

import { OrganizationNotFoundError } from './errors/organization-not-found-error'

type CreatePetUseCaseRequest = {
  about: string
  age: string
  dependency: string
  kind: string
  name: string
  size: string
  space: string
  identity_id: string
}

type CreatePetUseCaseResponse = {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly organizationRepository: OrganizationsRepository,
    private readonly petsRepository: PetsRepository,
  ) {}

  async execute({
    about,
    age,
    dependency,
    identity_id,
    kind,
    name,
    size,
    space,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationRepository.findByIdentityId(identity_id)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      dependency,
      kind,
      name,
      organization_id: organization.id,
      size,
      space,
    })

    return { pet }
  }
}
