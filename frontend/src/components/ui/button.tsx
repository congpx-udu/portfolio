import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90',
  outline: 'border border-border bg-background/40 backdrop-blur hover:bg-muted',
  ghost: 'hover:bg-muted',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
};

interface VariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function buttonClasses({ variant = 'primary', size = 'md' }: VariantProps, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:pointer-events-none disabled:opacity-50',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<'button'> & VariantProps) {
  return <button className={buttonClasses({ variant, size }, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & VariantProps) {
  return <Link className={buttonClasses({ variant, size }, className)} {...props} />;
}

/**
 * Plain anchor styled as a button, for in-page jumps such as `#projects`.
 * Next's `<Link>` ignores clicks whose URL equals the current one, so a hash link
 * would stop scrolling once that hash is already in the address bar.
 */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ComponentProps<'a'> & VariantProps) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />;
}
