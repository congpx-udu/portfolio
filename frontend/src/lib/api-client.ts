import { env } from '@/lib/env';
import type { ApiErrorBody, ApiSuccess } from '@/types/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: ApiErrorBody['error']['details'],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Typed fetch wrapper for the backend API. Unwraps `{ data }` and throws `ApiError` on failure. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const error = (body as ApiErrorBody | null)?.error;
    throw new ApiError(response.status, error?.message ?? response.statusText, error?.details);
  }

  return (body as ApiSuccess<T>).data;
}
