import app from '.';
import logger from './config/logger';
import http, { Server } from 'http';
import { sequelize } from './models';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection was successful.');
  } catch (err: unknown) {
    logger.error(`Database connection failed: ${err}`);
  }
}

const PORT  = process.env.PORT || 5500;
const server = http.createServer(app);

const shutdown = async (server: Server) => {
  logger.info(`Shutting down gracefully`);
  sequelize.close();
  server.close();
  return process.exit();
};

server.listen(PORT, () => {
  connectDB();
  logger.info(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => shutdown(server));
process.on('SIGTERM', async () => shutdown(server));