import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { TiltCard } from '@/components/ui/tilt-card';
import { about, services, siteConfig } from '@/config/site';

import { ServiceIcon } from './service-icon';

export function AboutSection() {
  return (
    <Section id="about" eyebrow="Giới thiệu" title="Tổng quan.">
      <Reveal className="max-w-3xl space-y-4 text-[1.0625rem] leading-[1.875rem] text-muted-foreground">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Hiện sống tại <span className="text-foreground">{siteConfig.location}</span>.
        </p>
      </Reveal>

      <ul className="mt-16 grid gap-10 xs:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Reveal as="li" key={service.title} direction="left" delay={index * 0.15}>
            <TiltCard className="h-full">
              <div className="h-full rounded-[1.25rem] bg-gradient-green-pink p-px shadow-card">
                <div className="flex h-full min-h-[17.5rem] flex-col items-center justify-center gap-8 rounded-[1.25rem] bg-muted px-8 py-5">
                  <ServiceIcon name={service.icon} />
                  {/* Reserve two lines so icons line up across cards whose titles wrap differently. */}
                  <h3 className="flex min-h-14 items-center text-center text-xl font-bold">
                    {service.title}
                  </h3>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
