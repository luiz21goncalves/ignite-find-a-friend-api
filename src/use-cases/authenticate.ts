import { HashProvider } from '@/providers/hash-provider'
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
  constructor(
    private readonly identitiesRepository: IdentitiesRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const identity = await this.identitiesRepository.findByEmail(email)

    if (!identity) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await this.hashProvider.verify(
      identity.password_hash,
      password,
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
