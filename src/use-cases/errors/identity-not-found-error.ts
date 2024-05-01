import { AppError } from '@/errors/AppError'

export class IdentityNotFoundError extends AppError {
  constructor() {
    super({
      error: 'Identity not found',
      message: 'Could not be found the identity',
      statusCode: 404,
      type: 'constraint_error',
    })
  }
}
