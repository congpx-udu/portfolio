import { z } from 'zod';

// Client-side mirror of backend/src/modules/contact/contact.schema.ts — keep the rules in sync.
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Tên cần ít nhất 2 ký tự').max(100),
  email: z.email('Email không hợp lệ').max(200),
  message: z.string().trim().min(10, 'Nội dung cần ít nhất 10 ký tự').max(5000),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string[]>>;
