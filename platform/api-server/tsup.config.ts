import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'node20',
  external: [
    /^@narriva\//,
    /^@aws-sdk\//,
    'fastify',
    '@fastify/cors',
    '@fastify/helmet',
    '@fastify/jwt',
    'dotenv',
    'jsonwebtoken',
    'zod',
    '@zodios/core',
    'ulid',
  ],
});
