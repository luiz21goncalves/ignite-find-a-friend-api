import { FastifyInstance } from 'fastify'

import { petFilters } from './pet-filters'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/filters', petFilters)
}
