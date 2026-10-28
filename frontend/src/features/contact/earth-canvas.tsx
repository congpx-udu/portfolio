'use client';

import dynamic from 'next/dynamic';

// Load three.js and the ~3MB model only in the browser, after the rest of the page is interactive.
const EarthScene = dynamic(() => import('./earth-scene').then((mod) => mod.EarthScene), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center">
      <span className="size-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  ),
});

/** Decorative rotating planet. Drag-to-rotate is desktop-only so it never traps touch scrolling. */
export function EarthCanvas() {
  return (
    <div aria-hidden className="pointer-events-none size-full md:pointer-events-auto">
      <EarthScene />
    </div>
  );
}
