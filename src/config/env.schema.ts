import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z
    .string()
    .min(10, 'JWT_SECRET must be at least 10 characters long')
    .default('your_jwt_secret'),
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL must be a valid connection string'),
});
