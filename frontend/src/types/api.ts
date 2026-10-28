// Mirrors the backend contract in backend/src/types/api.ts and backend/src/modules/*/*.schema.ts.
// Keep both sides in sync when the API changes.

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiErrorBody {
  error: {
    message: string;
    details?: Record<string, string[] | undefined>;
  };
}

export interface ProjectChallenge {
  title: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  context: string;
  features: string[];
  contributions: string[];
  challenges: ProjectChallenge[];
  techStack: string[];
  /** Screenshot path under frontend/public, e.g. "/images/projects/x.png". */
  image: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  year: number;
  featured: boolean;
  order: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
}
