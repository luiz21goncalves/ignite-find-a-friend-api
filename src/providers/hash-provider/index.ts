export type HashProvider = {
  hash(password: string): Promise<string>
  verify(password_hash: string, password: string): Promise<boolean>
}
