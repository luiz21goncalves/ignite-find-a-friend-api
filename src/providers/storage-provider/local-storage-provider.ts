import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

import { TMP_DIR } from '@/constants'

import { ReadFileData, SaveFileData, StorateProvider } from '.'

export class LocalStorageProvider implements StorateProvider {
  async save({ content, filename, folder }: SaveFileData): Promise<void> {
    const filePath = path.join(TMP_DIR, folder, filename)

    await fs.mkdir(path.dirname(filePath), { recursive: true })

    return fs.writeFile(filePath, content, { encoding: 'utf-8' })
  }

  async read({ filename, folder }: ReadFileData): Promise<string | null> {
    const filePath = path.join(TMP_DIR, folder, filename)

    if (existsSync(filePath)) {
      return fs.readFile(filePath, { encoding: 'utf-8' })
    }

    return null
  }
}
