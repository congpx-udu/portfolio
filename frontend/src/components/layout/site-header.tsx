'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type KeyboardEvent, useEffect, useState } from 'react';

import { Container } from '@/components/ui/container';
import { navItems, siteConfig } from '@/config/site';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const SECTION_IDS = navItems.map((item) => item.href.slice(1));
const SCROLL_THRESHOLD = 100;
const MOBILE_MENU_ID = 'mobile-menu';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleMenuKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') setIsMenuOpen(false);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors',
        isScrolled || isMenuOpen ? 'bg-background/90 backdrop-blur' : 'bg-transparent',
      )}
      onKeyDown={handleMenuKeyDown}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold" onClick={closeMenu}>
          {siteConfig.name}
          <span className="text-primary">.</span>
        </Link>

        <nav aria-label="Điều hướng chính">
          <ul className="hidden items-center gap-10 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} isActive={activeId === item.href.slice(1)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="-mr-2 flex size-10 items-center justify-center rounded-lg sm:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>

          <ul
            id={MOBILE_MENU_ID}
            className={cn(
              'absolute inset-x-4 top-20 flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card sm:hidden',
              isMenuOpen ? 'flex' : 'hidden',
            )}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  isActive={activeId === item.href.slice(1)}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  onClick?: () => void;
  children: string;
}

function NavLink({ href, isActive, onClick, children }: NavLinkProps) {
  const pathname = usePathname();
  const linkProps = {
    'aria-current': isActive ? ('location' as const) : undefined,
    onClick,
    className: cn(
      'font-medium transition-colors hover:text-foreground',
      isActive ? 'text-foreground' : 'text-muted-foreground',
    ),
  };

  // On the home page a plain anchor always scrolls, even when the hash is already in the URL
  // (Next's <Link> skips navigating to the current URL). Elsewhere, <Link> to "/#id" keeps it client-side.
  if (pathname === '/') {
    return (
      <a href={href} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={`/${href}`} {...linkProps}>
      {children}
    </Link>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
