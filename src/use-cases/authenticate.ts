import argon2 from 'argon2'

import { ENV } from '@/env'
import {
  IdentitiesRepository,
  Identity,
} from '@/repositories/identities-repository'

import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  identity: Pick<Identity, 'id' | 'email' | 'created_at' | 'updated_at'>
}

export class AuthenticateUseCase {
  constructor(private readonly identitiesRepository: IdentitiesRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const identity = await this.identitiesRepository.findByEmail(email)

    if (!identity) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await argon2.verify(
      identity.password_hash,
      password,
      { secret: Buffer.from(ENV.PASS_SECRET) },
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

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
