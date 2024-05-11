import { StatusCodes } from 'http-status-codes'

import { AppError } from '@/errors/app-error'

export class IdentityAlreadyExistsError extends AppError {
  constructor() {
    super({
      error: 'Identity already exists',
      message: 'Email already in use',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      type: 'constraint_error',
    })
  }
}
