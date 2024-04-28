export type SaveFileData = {
  content: Buffer
  folder: string
  filename: string
}

export type ReadFileData = {
  folder: string
  filename: string
}

export type StorateProvider = {
  save(data: SaveFileData): Promise<void>
  read(data: ReadFileData): Promise<string | null>
}
