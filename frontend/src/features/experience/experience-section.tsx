import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { experiences } from '@/config/site';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Những gì tôi đã làm" title="Kinh nghiệm làm việc.">
      {/* Vertical timeline: a single column on mobile, alternating left/right from md up. */}
      <ol className="relative mx-auto max-w-5xl space-y-12 before:absolute before:inset-y-0 before:left-4 before:w-1 before:bg-surface-raised md:before:left-1/2 md:before:-translate-x-1/2">
        {experiences.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <Reveal
              as="li"
              key={`${item.company}-${item.period}`}
              direction={isLeft ? 'left' : 'right'}
              className="relative pl-14 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
            >
              <span
                aria-hidden
                className="absolute top-4 left-0 flex size-9 items-center justify-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground md:left-1/2 md:-translate-x-1/2"
              >
                {item.company.charAt(0)}
              </span>

              <p
                className={cn(
                  'mb-3 font-mono text-sm text-muted-foreground md:row-start-1 md:mb-0 md:pt-6',
                  isLeft ? 'md:col-start-2' : 'md:col-start-1 md:text-right',
                )}
              >
                {item.period}
              </p>

              <article
                className={cn(
                  'rounded-2xl border-b-4 border-primary bg-surface-raised p-6 shadow-card md:row-start-1',
                  isLeft ? 'md:col-start-1' : 'md:col-start-2',
                )}
              >
                <h3 className="text-xl font-bold sm:text-2xl">{item.position}</h3>
                <p className="mt-1 font-semibold text-muted-foreground">{item.company}</p>
                <ul className="mt-5 ml-5 list-disc space-y-2 text-sm tracking-wide">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="pl-1">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
