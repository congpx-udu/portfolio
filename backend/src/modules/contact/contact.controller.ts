import type { Request, Response } from 'express';

import type { ApiSuccess } from '@/types/api';

import type { ContactMessage } from './contact.schema';
import { contactService } from './contact.service';

export const contactController = {
  async submit(
    req: Request<unknown, unknown, ContactMessage>,
    res: Response<ApiSuccess<{ received: true }>>,
  ) {
    await contactService.submit(req.body);
    res.status(201).json({ data: { received: true } });
  },
};
