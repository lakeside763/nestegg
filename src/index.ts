import express, {Request, Response} from 'express';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import packageJson from '../package.json';
import errorHandler from './middlewares/error';
import appRoutes from './routes';
import routesMiddleware from './middlewares/routes';

dotenv.config();

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

// Register API Routes
app.use("/v1", routesMiddleware, appRoutes);


app.get('/v1/health', (req: Request, res: Response) => {
  res.status(200).send({ name: packageJson.name, version: packageJson.version });
});

app.use(errorHandler);

export default app;