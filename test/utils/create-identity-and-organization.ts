import { faker } from '@faker-js/faker'
import supertest from 'supertest'

import { app } from '@/app'
import { Identity } from '@/repositories/identities-repository'
import { Organization } from '@/repositories/organizations-repository'

import { createIdentity } from './create-identity'

export async function CreateIdentityAndOrganization(
  override?: Partial<{
    email: string
    password: string
    name: string
    address: string
    whatsapp: string
    zip_code: string
  }>,
): Promise<{ identity: Identity; token: string; organization: Organization }> {
  const { identity, token } = await createIdentity(override)

  const name = faker.company.name()
  const address = faker.location.streetAddress({ useFullAddress: true })
  const whatsapp = faker.phone.number()
  const zip_code = faker.location.zipCode()

  const response = await supertest(app.server)
    .post('/v1/organization')
    .auth(token, { type: 'bearer' })
    .send({
      address,
      name,
      whatsapp,
      zip_code,
      ...override,
    })

  const { organization } = response.body

  return { identity, organization, token }
}
