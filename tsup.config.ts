import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['./src/server.ts'],
  format: 'cjs',
  minify: true,
  outDir: 'dist',
})
