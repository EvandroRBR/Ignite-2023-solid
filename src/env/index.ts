import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error(
    '\x1b[31mInvalid environment variables.\x1b[0m',
    _env.error.format(),
  );

  throw new Error('\x1b[31mInvalid environment variables.\x1b[0m');
}

export const env = _env.data;
