import { apiFetch } from '@/lib/api-client';
import type { ContactPayload } from '@/types/api';

export function sendContactMessage(payload: ContactPayload) {
  return apiFetch<{ received: true }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
