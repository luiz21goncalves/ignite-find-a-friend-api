import { faker } from '@faker-js/faker'
import supertest from 'supertest'

import { app } from '@/app'
import { Identity } from '@/repositories/identities-repository'

export async function createIdentity(
  override?: Partial<{ email: string; password: string }>,
): Promise<{ identity: Identity; token: string }> {
  const response = await supertest(app.server)
    .post('/v1/identities')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    })

  const { identity, token } = response.body

  return { identity, token }
}
