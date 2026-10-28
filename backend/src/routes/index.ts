import { Router } from 'express';

import { contactRouter } from '@/modules/contact/contact.routes';
import { healthRouter } from '@/modules/health/health.routes';
import { projectsRouter } from '@/modules/projects/projects.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/contact', contactRouter);
