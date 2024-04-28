import { logger } from '@/logger'

import { HttpProvider } from '.'

export class FetchHttpProvider implements HttpProvider {
  async get<TData = unknown>(url: string): Promise<TData> {
    logger.trace(`request to ${url} started.`)
    const response = await fetch(url)
    logger.trace(`request to ${url} finished.`)

    logger.trace(`started json conversion to response for ${url}.`)
    const data = (await response.json()) as TData
    logger.trace(`finished json conversion to response for ${url}.`)

    logger.trace({
      body: data,
      headers: response.headers,
      status: response.status,
      url,
    })
    return data
  }
}
