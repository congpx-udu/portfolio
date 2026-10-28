import { rateLimit } from 'express-rate-limit';

import { HttpError } from '@/utils/http-error';

/** Strict limiter for write endpoints exposed to the public (e.g. contact form). */
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, _res, next) =>
    next(HttpError.tooManyRequests('Too many requests, try again later')),
});
