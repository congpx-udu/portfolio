'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Side the element slides in from. */
  direction?: RevealDirection;
  delay?: number;
  as?: 'div' | 'li';
  className?: string;
}

const OFFSETS: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fades and slides its children in the first time they scroll into view.
 * Lets Server Components opt into animation without becoming Client Components themselves.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  as = 'div',
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? OFFSETS.none : OFFSETS[direction];
  const Component = as === 'li' ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', duration: 1, bounce: 0.2, delay }}
    >
      {children}
    </Component>
  );
}
