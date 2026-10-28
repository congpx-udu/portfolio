import nodemailer from 'nodemailer';

import { env } from '@/config/env';
import { logger } from '@/utils/logger';

/**
 * Gmail SMTP transport, or `null` when SMTP_USER / SMTP_PASS are not configured.
 * Callers must handle `null` explicitly so a missing config never fails silently.
 */
export const mailer =
  env.SMTP_USER && env.SMTP_PASS
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        // Fail fast instead of keeping the visitor's request hanging on a slow SMTP server.
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      })
    : null;

if (!mailer) {
  logger.warn('SMTP_USER/SMTP_PASS not set — POST /api/contact will respond 503');
}
