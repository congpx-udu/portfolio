import type { services } from '@/config/site';

type ServiceIconName = (typeof services)[number]['icon'];

interface ServiceIconProps {
  name: ServiceIconName;
}

const ICON_PATHS: Record<ServiceIconName, string[]> = {
  code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  layout: [
    'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
    'M3 9h18',
    'M9 21V9',
  ],
  chart: ['M3 3v18h18', 'M7 15l4-4 3 3 5-6'],
  gauge: ['M12 14l4-4', 'M3.34 19a10 10 0 1117.32 0'],
};

export function ServiceIcon({ name }: ServiceIconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-16 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
