import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport, or `null`.
 * `sectionIds` must be a stable reference (e.g. a module constant) to avoid re-subscribing.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          setActiveId((current) => {
            if (entry.isIntersecting) return id;
            return current === id ? null : current;
          });
        }
      },
      // Shrink the root to a thin line across the middle of the screen.
      { rootMargin: '-45% 0px -55% 0px' },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
