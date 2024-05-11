import { prisma } from '@/lib/prisma'

import { CreatePetData, Pet, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create({
    about,
    age,
    dependency,
    organization_id,
    kind,
    name,
    size,
    space,
    energy,
  }: CreatePetData): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        about,
        age,
        dependency,
        energy,
        kind,
        name,
        organization_id,
        size,
        space,
      },
    })

    return { ...pet, energy: pet.energy ?? '' }
  }
}
