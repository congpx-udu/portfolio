import { env } from '@/config/env';
import { HttpError } from '@/utils/http-error';
import { logger } from '@/utils/logger';
import { isMailerConfigured, sendEmail } from '@/utils/mailer';

import type { ContactMessage } from './contact.schema';

export const contactService = {
  async submit({ name, email, message }: ContactMessage): Promise<void> {
    if (!isMailerConfigured || !env.CONTACT_RECEIVER) {
      throw HttpError.serviceUnavailable('Contact form is not configured');
    }

    try {
      await sendEmail({
        to: env.CONTACT_RECEIVER,
        // Hitting "Reply" in the inbox answers the visitor directly.
        replyTo: email,
        subject: `[Portfolio] Tin nhắn mới từ ${name}`,
        // Plain text only: visitor input is never rendered as HTML in the inbox.
        text: buildEmailText({ name, email, message }),
      });
    } catch (error) {
      // Log the delivery failure but never the message content (CLAUDE.md §9.4).
      logger.error({ err: error }, 'Failed to send contact email');
      throw HttpError.serviceUnavailable('Could not send the message, please try again later');
    }

    logger.info({ length: message.length }, 'Contact message emailed');
  },
};

function buildEmailText({ name, email, message }: ContactMessage) {
  return [
    `Họ tên: ${name}`,
    `Email: ${email}`,
    `Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
    '',
    'Nội dung:',
    message,
    '',
    '—',
    'Gửi từ form liên hệ trên portfolio. Bấm "Trả lời" để phản hồi trực tiếp người gửi.',
  ].join('\n');
}
