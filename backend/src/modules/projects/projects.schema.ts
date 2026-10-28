import { z } from 'zod';

export const projectChallengeSchema = z.object({
  title: z.string().min(1),
  solution: z.string().min(1),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  context: z.string().min(1),
  features: z.array(z.string().min(1)),
  contributions: z.array(z.string().min(1)),
  challenges: z.array(projectChallengeSchema),
  techStack: z.array(z.string()).min(1),
  // Path of a screenshot served by the frontend from its public/ folder, e.g. "/images/projects/x.png".
  image: z.string().startsWith('/').nullable(),
  repoUrl: z.url().nullable(),
  liveUrl: z.url().nullable(),
  year: z.number().int(),
  featured: z.boolean(),
  order: z.number().int(),
});

export const projectParamsSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug'),
});

export const listProjectsQuerySchema = z.object({
  featured: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectChallenge = z.infer<typeof projectChallengeSchema>;
export type ProjectParams = z.infer<typeof projectParamsSchema>;
export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
