import { faker } from '@faker-js/faker'

import { prisma } from '@/lib/prisma'
import { Pet } from '@/repositories/pets-repository'

export async function createPet(
  override?: Partial<{
    zip_code: string
    about: string
    age: string
    dependency: string
    kind: string
    name: string
    size: string
    space: string
    energy: string
  }>,
): Promise<{ pet: Pet }> {
  const organization = await prisma.organization.create({
    data: {
      address: faker.location.streetAddress({ useFullAddress: true }),
      identity: {
        create: {
          email: faker.internet.email(),
          password_hash: faker.internet.password(),
        },
      },
      name: faker.company.name(),
      whatsapp: faker.phone.number(),
      zip_code: override?.zip_code ?? faker.location.zipCode(),
    },
  })

  const pet = await prisma.pet.create({
    data: {
      about: override?.about ?? faker.lorem.sentence(),
      age: override?.age ?? faker.lorem.word(),
      dependency: override?.dependency ?? faker.lorem.word(),
      energy: override?.energy ?? faker.lorem.word(),
      kind: override?.kind ?? faker.lorem.word(),
      name: override?.name ?? faker.lorem.word(),
      organization_id: organization.id,
      size: override?.size ?? faker.lorem.word(),
      space: override?.space ?? faker.lorem.word(),
    },
  })

  return { pet: { ...pet, energy: pet.energy ?? '' } }
}
