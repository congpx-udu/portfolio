'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ApiError } from '@/lib/api-client';
import { sendContactMessage } from '@/services/contact.service';

import { type ContactFormErrors, contactFormSchema } from './contact.schema';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// The API answers in English; show visitors a Vietnamese message per status instead.
const ERROR_MESSAGES: Record<number, string> = {
  400: 'Thông tin chưa hợp lệ, vui lòng kiểm tra lại.',
  429: 'Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau 15 phút.',
};
const FALLBACK_ERROR_MESSAGE = `Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau hoặc email trực tiếp tới ${siteConfig.email}.`;

const INPUT_CLASSES =
  'w-full rounded-lg border border-transparent bg-muted px-6 py-4 font-medium outline-none transition placeholder:text-muted-foreground focus:border-primary aria-invalid:border-red-500';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [serverMessage, setServerMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = contactFormSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      await sendContactMessage(parsed.data);
      form.reset();
      setStatus('success');
    } catch (error) {
      if (error instanceof ApiError && error.details) setErrors(error.details);
      setServerMessage(getErrorMessage(error));
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <Field id="name" label="Họ tên" error={errors.name?.[0]}>
        {(fieldProps) => (
          <input
            {...fieldProps}
            name="name"
            placeholder="Tên của bạn là gì?"
            autoComplete="name"
            required
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      <Field id="email" label="Email" error={errors.email?.[0]}>
        {(fieldProps) => (
          <input
            {...fieldProps}
            name="email"
            type="email"
            placeholder="Email của bạn là gì?"
            autoComplete="email"
            required
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      <Field id="message" label="Nội dung" error={errors.message?.[0]}>
        {(fieldProps) => (
          <textarea
            {...fieldProps}
            name="message"
            rows={6}
            placeholder="Bạn muốn nói gì với tôi?"
            required
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      {/* Honeypot field, hidden from humans and assistive tech. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Đang gửi…' : 'Gửi tin nhắn'}
        </Button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === 'success' && (
            <span className="text-green-600">Cảm ơn bạn! Tôi sẽ phản hồi sớm.</span>
          )}
          {status === 'error' && <span className="text-red-500">{serverMessage}</span>}
        </p>
      </div>
    </form>
  );
}

interface FieldControlProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby': string | undefined;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: (props: FieldControlProps) => ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-3">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) return ERROR_MESSAGES[error.status] ?? FALLBACK_ERROR_MESSAGE;
  return FALLBACK_ERROR_MESSAGE;
}
