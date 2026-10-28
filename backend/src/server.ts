import { createApp } from '@/app';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

const server = createApp().listen(env.PORT, () => {
  logger.info(`API ready at http://localhost:${env.PORT}/api`);
});

function shutdown(signal: NodeJS.Signals) {
  logger.info(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
