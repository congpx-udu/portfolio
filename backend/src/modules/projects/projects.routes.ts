import { Router } from 'express';

import { validate } from '@/middlewares/validate';

import { projectsController } from './projects.controller';
import { projectParamsSchema } from './projects.schema';

export const projectsRouter = Router();

projectsRouter.get('/', projectsController.list);
projectsRouter.get(
  '/:slug',
  validate({ params: projectParamsSchema }),
  projectsController.getBySlug,
);
