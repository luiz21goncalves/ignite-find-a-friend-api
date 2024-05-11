import { StatusCodes } from 'http-status-codes'

import { AppError } from '@/errors/app-error'

export class OrganizationNotFoundError extends AppError {
  constructor() {
    super({
      error: 'Organization not found',
      message: 'Could not be found the organization',
      statusCode: StatusCodes.NOT_FOUND,
      type: 'constraint_error',
    })
  }
}
