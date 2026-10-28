import { ApiError, apiFetch } from '@/lib/api-client';
import { env } from '@/lib/env';
import type { Project } from '@/types/api';

// Skip the data cache in development so edits to backend data show up on the next reload.
const REVALIDATE_SECONDS = env.isDevelopment ? 0 : 60 * 60;

export async function getProjects(options: { featured?: boolean } = {}): Promise<Project[]> {
  const query = options.featured === undefined ? '' : `?featured=${options.featured}`;

  try {
    return await apiFetch<Project[]>(`/projects${query}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ['projects'] },
    });
  } catch (error) {
    // Keep the page renderable when the API is unreachable (e.g. during build).
    console.error('[getProjects] failed:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ['projects', `project:${slug}`] },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
