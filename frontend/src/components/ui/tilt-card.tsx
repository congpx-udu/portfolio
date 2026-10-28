'use client';

import { useReducedMotion } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  /** Maximum rotation in degrees on each axis. */
  maxTilt?: number;
  className?: string;
}

/** Tilts toward the mouse pointer for a 3D effect. Touch and reduced-motion users get a static card. */
export function TiltCard({ children, maxTilt = 12, className }: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Write the transform straight to the DOM: pointermove fires too often to go through React state.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(1000px) rotateX(${-y * maxTilt * 2}deg) rotateY(${x * maxTilt * 2}deg)`;
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.transform = '';
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('transition-transform duration-200 ease-out', className)}
    >
      {children}
    </div>
  );
}
