import { AppError } from '@/errors/app-error'

export class IdentityAlreadyExistsError extends AppError {
  constructor() {
    super({
      error: 'Identity already exists',
      message: 'Email already in use',
      statusCode: 422,
      type: 'constraint_error',
    })
  }
}
