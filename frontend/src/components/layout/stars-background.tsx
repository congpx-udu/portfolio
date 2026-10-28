'use client';

import dynamic from 'next/dynamic';

// WebGL only exists in the browser, and three.js is heavy — load it client-side after hydration.
const StarsScene = dynamic(() => import('./stars-scene').then((mod) => mod.StarsScene), {
  ssr: false,
});

/** Decorative animated star field fixed behind every page. */
export function StarsBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <StarsScene />
    </div>
  );
}
