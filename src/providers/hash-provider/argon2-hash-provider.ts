import argon2 from 'argon2'

import { ENV } from '@/env'

import { HashProvider } from '.'

export class Argon2HashProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      secret: Buffer.from(ENV.PASS_SECRET),
    })
  }

  async verify(password_hash: string, password: string): Promise<boolean> {
    return argon2.verify(password_hash, password, {
      secret: Buffer.from(ENV.PASS_SECRET),
    })
  }
}
