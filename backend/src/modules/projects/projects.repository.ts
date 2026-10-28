import { z } from 'zod';

import rawProjects from '@/data/projects.json';

import { type Project, projectSchema } from './projects.schema';

// Validated once at startup so a malformed data file fails fast.
// Swap this module for a database implementation without touching the service layer.
const projects: Project[] = z.array(projectSchema).parse(rawProjects);

export const projectsRepository = {
  async findAll(): Promise<Project[]> {
    return projects;
  },

  async findBySlug(slug: string): Promise<Project | undefined> {
    return projects.find((project) => project.slug === slug);
  },
};
