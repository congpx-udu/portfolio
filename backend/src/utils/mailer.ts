import { env } from '@/config/env';
import { logger } from '@/utils/logger';

interface Email {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
// Resend's shared test sender — works without verifying a domain of our own.
const SENDER = 'Portfolio Contact <onboarding@resend.dev>';
const REQUEST_TIMEOUT_MS = 10_000;

/** Whether an email provider is configured. */
export const isMailerConfigured = Boolean(env.RESEND_API_KEY);

if (!isMailerConfigured) {
  logger.warn('RESEND_API_KEY not set — POST /api/contact will respond 503');
}

/** Sends a plain-text email through the Resend HTTP API. Throws when delivery fails. */
export async function sendEmail({ to, subject, text, replyTo }: Email): Promise<void> {
  if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: SENDER, to: [to], subject, text, reply_to: replyTo }),
    // Fail fast instead of keeping the visitor's request hanging on a slow provider.
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    // Resend's error body explains the cause (invalid key, unverified recipient…); it holds no message content.
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
