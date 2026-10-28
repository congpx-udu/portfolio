import { HttpError } from '@/utils/http-error';

import { projectsRepository } from './projects.repository';
import type { ListProjectsQuery, Project } from './projects.schema';

export const projectsService = {
  async list(query: ListProjectsQuery): Promise<Project[]> {
    const projects = await projectsRepository.findAll();

    return projects
      .filter((project) => query.featured === undefined || project.featured === query.featured)
      .toSorted((a, b) => a.order - b.order);
  },

  async getBySlug(slug: string): Promise<Project> {
    const project = await projectsRepository.findBySlug(slug);
    if (!project) throw HttpError.notFound(`Project "${slug}" not found`);
    return project;
  },
};
