import argon2 from 'argon2'

import { ENV } from '@/env'
import {
  IdentitiesRepository,
  Identity,
} from '@/repositories/identities-repository'

import { IdentityAlreadyExistsError } from './errors/IdentityAlreadyExistsError'

type CreateIdentityUseCaseRequest = {
  email: string
  password: string
}
type CreateIdentityUseCaseResponse = {
  identity: Pick<Identity, 'id' | 'email' | 'created_at' | 'updated_at'>
}

export class CreateIdentityUseCase {
  constructor(private readonly identitiesRepository: IdentitiesRepository) {}

  async execute({
    email,
    password,
  }: CreateIdentityUseCaseRequest): Promise<CreateIdentityUseCaseResponse> {
    const identityWithSameEmail =
      await this.identitiesRepository.findByEmail(email)

    if (identityWithSameEmail) {
      throw new IdentityAlreadyExistsError()
    }

    const password_hash = await argon2.hash(password, {
      secret: Buffer.from(ENV.PASS_SECRET),
    })

    const identity = await this.identitiesRepository.create({
      email,
      password_hash,
    })

    return {
      identity: {
        created_at: identity.created_at,
        email: identity.email,
        id: identity.id,
        updated_at: identity.updated_at,
      },
    }
  }
}
