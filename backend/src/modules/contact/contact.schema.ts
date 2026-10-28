import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0).optional(),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
