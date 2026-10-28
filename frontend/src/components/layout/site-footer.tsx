import Image from 'next/image';
import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { credits, navItems, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

// Every label that has an icon; a label in siteConfig.socials outside this union fails typecheck.
type SocialLabel = 'GitHub' | 'LinkedIn';

interface FooterColumnProps {
  title: string;
  children: ReactNode;
}

const SOCIAL_ICON_PATHS: Record<SocialLabel, string> = {
  GitHub:
    'M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z',
  LinkedIn:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
};

const LINK_CLASSES = 'transition-colors hover:text-foreground';

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-background/80 backdrop-blur">
      <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-green-pink" />

      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-gradient-green-pink p-0.5">
              <Image
                src={siteConfig.avatar}
                alt=""
                width={56}
                height={56}
                className="size-full rounded-full object-cover object-[50%_25%]"
              />
            </div>
            <div>
              <p className="text-xl font-black">
                {siteConfig.name}
                <span className="text-primary">.</span>
              </p>
              <p className="text-sm text-primary">{siteConfig.role}</p>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>

          <ul className="mt-6 flex gap-3" aria-label="Mạng xã hội">
            {siteConfig.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-11 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-foreground"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor">
                    <path d={SOCIAL_ICON_PATHS[social.label]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Điều hướng">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                {/* "/#id" works from every page; on the home page it is a plain in-page jump. */}
                <a href={`/${item.href}`} className={LINK_CLASSES}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Liên hệ">
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={LINK_CLASSES}>
                {/* Allow a line break only before "@" so a narrow column never splits the domain. */}
                {siteConfig.email.split('@')[0]}
                <wbr />@{siteConfig.email.split('@')[1]}
              </a>
            </li>
            <li>{siteConfig.location}</li>
          </ul>
        </FooterColumn>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a href="#main" className={cn('inline-flex items-center gap-2', LINK_CLASSES)}>
            Lên đầu trang
            <span aria-hidden>↑</span>
          </a>
        </Container>

        <Container className="pb-6 text-center text-xs text-muted-foreground/80 sm:text-left">
          {credits.map((credit) => (
            <p key={credit.workUrl}>
              Mô hình 3D <CreditLink href={credit.workUrl}>“{credit.work}”</CreditLink> của{' '}
              <CreditLink href={credit.authorUrl}>{credit.author}</CreditLink>, giấy phép{' '}
              <CreditLink href={credit.licenseUrl}>{credit.license}</CreditLink>.
            </p>
          ))}
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="text-sm text-muted-foreground">
      <h2 className="mb-4 text-xs font-semibold tracking-wider text-foreground uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}

function CreditLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}
