import { StatusCodes } from 'http-status-codes'

import { AppError } from '@/errors/app-error'

export class IdentityNotFoundError extends AppError {
  constructor() {
    super({
      error: 'Identity not found',
      message: 'Could not be found the identity',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'constraint_error',
    })
  }
}
