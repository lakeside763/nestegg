import express from "express";
import errorHandler from "../middlewares/error";
import appRoutes from './../routes';
import routesMiddleware from './../middlewares/routes'

// Function to create a test app
export const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/v1', routesMiddleware, appRoutes);
  app.use(errorHandler);
  return app;
};