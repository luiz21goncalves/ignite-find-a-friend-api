import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'

export async function createOrganization(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createOrganizationBodySchema = z.object({
    address: z.string(),
    name: z.string(),
    whatsapp: z.string(),
    zip_code: z.string(),
  })

  const { address, name, whatsapp, zip_code } =
    createOrganizationBodySchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  const identity_id = request.user.sub

  const { organization } = await createOrganizationUseCase.execute({
    address,
    identity_id,
    name,
    whatsapp,
    zip_code,
  })

  return replay.status(StatusCodes.CREATED).send({ organization })
}
