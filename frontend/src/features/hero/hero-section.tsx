import { ButtonAnchor } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { siteConfig } from '@/config/site';

import { HeroAvatar } from './hero-avatar';

export function HeroSection() {
  return (
    <section aria-label="Giới thiệu nhanh" className="relative flex min-h-svh items-center">
      {/* Mobile: avatar on top, text below. Desktop: text left, avatar right. */}
      <Container className="grid items-center gap-10 pt-28 pb-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-20">
        <Reveal
          direction="right"
          delay={0.2}
          className="row-start-1 justify-self-center lg:col-start-2"
        >
          <HeroAvatar />
        </Reveal>

        <div className="flex items-start gap-5">
          <div aria-hidden className="mt-5 flex flex-col items-center">
            <span className="size-5 rounded-full bg-primary" />
            <span className="h-40 w-1 bg-linear-to-b from-primary to-transparent sm:h-80" />
          </div>

          <div>
            <Reveal direction="down">
              <h1 className="mt-2 text-[2.5rem] leading-tight font-black text-balance xs:text-5xl sm:text-6xl lg:text-[5rem] lg:leading-[1.2]">
                Xin chào, tôi là <span className="text-primary">{siteConfig.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-4 text-base font-medium xs:text-xl sm:text-2xl lg:text-3xl lg:leading-10">
                {siteConfig.role}
              </p>
              <p className="mt-2 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
                {siteConfig.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-4">
              <ButtonAnchor href="#projects">Xem dự án</ButtonAnchor>
              <ButtonAnchor href="#contact" variant="outline">
                Liên hệ với tôi
              </ButtonAnchor>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Hidden on mobile, where the stacked hero is taller than the screen and it would overlap text. */}
      <a
        href="#about"
        aria-label="Cuộn xuống phần giới thiệu"
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 rounded-3xl lg:block"
      >
        <span className="flex h-16 w-9 items-start justify-center rounded-3xl border-4 border-muted-foreground p-2">
          <span className="size-3 animate-scroll-hint rounded-full bg-muted-foreground" />
        </span>
      </a>
    </section>
  );
}
