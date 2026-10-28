import type { ErrorRequestHandler } from 'express';
import { z, ZodError } from 'zod';

import type { ApiErrorBody } from '@/types/api';
import { HttpError } from '@/utils/http-error';
import { logger } from '@/utils/logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const body: ApiErrorBody = {
      error: { message: 'Validation failed', details: z.flattenError(err).fieldErrors },
    };
    res.status(400).json(body);
    return;
  }

  if (err instanceof HttpError) {
    const body: ApiErrorBody = { error: { message: err.message, details: err.details } };
    res.status(err.status).json(body);
    return;
  }

  logger.error({ err }, 'Unhandled error');
  const body: ApiErrorBody = { error: { message: 'Internal Server Error' } };
  res.status(500).json(body);
};
