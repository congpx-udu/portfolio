import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  // Gmail account that sends contact-form emails. Optional so the API still boots without it;
  // the contact endpoint then answers 503 instead of silently dropping messages.
  SMTP_USER: emptyAsUndefined(z.email()),
  // Gmail App Password (16 letters). Google displays it in groups of 4, so strip the spaces.
  SMTP_PASS: emptyAsUndefined(z.string().transform((value) => value.replace(/\s/g, ''))),
  // Inbox that receives contact messages; defaults to SMTP_USER.
  CONTACT_RECEIVER: emptyAsUndefined(z.email()),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Logger depends on env, so fall back to console here.
  // eslint-disable-next-line no-console
  console.error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  corsOrigins: parsed.data.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
};

/** Treats `KEY=` (empty value in .env) as not set, so optional vars can be left blank. */
function emptyAsUndefined<T extends z.ZodType>(schema: T) {
  return z.preprocess((value) => (value === '' ? undefined : value), schema.optional());
}
