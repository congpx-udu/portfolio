import type { ComponentProps } from 'react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

interface SectionProps extends ComponentProps<'section'> {
  id: string;
  title: string;
  eyebrow?: string;
}

/** Page section with an accessible heading; `id` is used for in-page navigation. */
export function Section({ id, title, eyebrow, className, children, ...props }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('relative py-16 sm:py-24', className)}
      {...props}
    >
      <Container>
        <Reveal direction="down" className="mb-8 sm:mb-10">
          {eyebrow && (
            <p className="mb-3 text-sm tracking-[0.2em] text-primary uppercase sm:text-base">
              {eyebrow}
            </p>
          )}
          {/* leading-tight (not Tailwind's default 1 for large text) leaves room for Vietnamese diacritics. */}
          <h2
            id={headingId}
            className="text-3xl leading-tight font-black xs:text-4xl sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
