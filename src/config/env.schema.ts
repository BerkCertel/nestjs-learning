import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  // JWT_SECRET: z
  //   .string()
  //   .min(10, 'JWT_SECRET must be at least 10 characters long')
  //   .default('your_jwt_secret'),
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL must be a valid connection string'),
  JWT_ACCESS_SECRET: z
    .string()
    .min(1, 'JWT_ACCESS_SECRET must be at least 1 character long')
    .default('your_jwt_access_secret'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(1, 'JWT_REFRESH_SECRET must be at least 1 character long'),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('30d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().positive().min(8).default(12),
});

export type Env = z.infer<typeof envSchema>;
