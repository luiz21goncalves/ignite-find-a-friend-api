import { HashProvider } from '@/providers/hash-provider'

export class FakeHashProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return password
  }

  async verify(password_hash: string, password: string): Promise<boolean> {
    return password_hash === password
  }
}
