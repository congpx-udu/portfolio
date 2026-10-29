import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StarsBackground } from '@/components/layout/stars-background';
import { siteConfig } from '@/config/site';
import { env } from '@/lib/env';

import './globals.css';

// Poppins (used by the original design) lacks the Vietnamese subset; Be Vietnam Pro is a close match.
const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
});
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-scroll-behavior: Next 16 turns off the CSS smooth scrolling (globals.css) while it
    // resets scroll on route change, so a new page starts at the top instead of gliding up.
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${beVietnamPro.variable} ${geistMono.variable}`}
    >
      <body>
        <StarsBackground />
        <a
          href="#main"
          className="sr-only z-50 rounded bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Bỏ qua tới nội dung chính
        </a>
        <SiteHeader />
        {/* Clip horizontally: elements waiting to slide in from the side (<Reveal>) start
            off-screen and would otherwise widen the page on mobile. */}
        <main id="main" className="overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
