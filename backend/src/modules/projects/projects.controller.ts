import type { Request, Response } from 'express';

import type { ApiSuccess } from '@/types/api';

import { type Project, type ProjectParams, listProjectsQuerySchema } from './projects.schema';
import { projectsService } from './projects.service';

export const projectsController = {
  async list(req: Request, res: Response<ApiSuccess<Project[]>>) {
    const query = listProjectsQuerySchema.parse(req.query);
    const projects = await projectsService.list(query);
    res.json({ data: projects });
  },

  async getBySlug(req: Request<ProjectParams>, res: Response<ApiSuccess<Project>>) {
    const project = await projectsService.getBySlug(req.params.slug);
    res.json({ data: project });
  },
};
