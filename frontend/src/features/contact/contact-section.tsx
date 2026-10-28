import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/config/site';

import { ContactForm } from './contact-form';
import { EarthCanvas } from './earth-canvas';

export function ContactSection() {
  return (
    <Section id="contact" eyebrow="Kết nối với tôi" title="Liên hệ.">
      <div className="flex flex-col-reverse gap-10 overflow-hidden xl:flex-row">
        <Reveal direction="left" className="rounded-2xl bg-surface p-6 sm:p-8 xl:flex-[0.75]">
          <p className="mb-8 text-muted-foreground">
            Bạn có dự án hoặc cơ hội hợp tác? Gửi tin nhắn cho tôi qua form dưới đây hoặc email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <ContactForm />
        </Reveal>

        <Reveal direction="right" className="h-[22rem] md:h-[34rem] xl:h-auto xl:flex-1">
          <EarthCanvas />
        </Reveal>
      </div>
    </Section>
  );
}
