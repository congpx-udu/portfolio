import { Router } from 'express';

import { strictRateLimit } from '@/middlewares/rate-limit';
import { validate } from '@/middlewares/validate';

import { contactController } from './contact.controller';
import { contactMessageSchema } from './contact.schema';

export const contactRouter = Router();

contactRouter.post(
  '/',
  strictRateLimit,
  validate({ body: contactMessageSchema }),
  contactController.submit,
);
