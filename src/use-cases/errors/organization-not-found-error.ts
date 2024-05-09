import { AppError } from '@/errors/app-error'

export class OrganizationNotFoundError extends AppError {
  constructor() {
    super({
      error: 'Organization not found',
      message: 'Could not be found the organization',
      statusCode: 404,
      type: 'constraint_error',
    })
  }
}
