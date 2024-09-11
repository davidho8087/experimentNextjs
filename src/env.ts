import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    HOST: z.string().min(1),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {
    NEXT_PUBLIC_STRAPI_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
  },
})
