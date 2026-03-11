import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig([
  {
    input: './src/api/openapi/auth-service.json',
    output: './src/api/generate/auth-service',
    plugins: ['@hey-api/client-fetch', '@hey-api/sdk', '@hey-api/typescript'],
  },
  {
    input: './src/api/openapi/user-service.json',
    output: './src/api/generate/user-service',
    plugins: ['@hey-api/client-fetch', '@hey-api/sdk', '@hey-api/typescript'],
  }
]);