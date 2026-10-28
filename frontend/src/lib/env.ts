// NEXT_PUBLIC_* values are inlined at build time, so they must be read with literal keys.
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;
