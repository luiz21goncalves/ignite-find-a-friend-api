import {
  IdentitiesRepository,
  Identity,
} from '@/repositories/identities-repository'

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
      throw new Error('Identity already exits')
    }

    const identity = await this.identitiesRepository.create({
      email,
      password_hash: password,
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
