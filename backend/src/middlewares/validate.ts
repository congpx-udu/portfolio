import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface RequestSchemas {
  body?: ZodType;
  params?: ZodType;
}

/**
 * Parses `req.body` / `req.params` with Zod and replaces them with the parsed value.
 * A ZodError is forwarded to the error handler, which responds with 400.
 * Query strings are parsed in the controller because `req.query` is read-only in Express 5.
 */
export const validate =
  (schemas: RequestSchemas): RequestHandler =>
  (req, _res, next) => {
    if (schemas.body) req.body = schemas.body.parse(req.body);
    if (schemas.params) req.params = schemas.params.parse(req.params) as typeof req.params;
    next();
  };
