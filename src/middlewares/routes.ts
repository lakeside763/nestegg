import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "./auth";

const router = Router();

const publicRoutes = [
  '/health',
  '/auth/login',
  '/customers/signup',
]

router.use((req: Request, res: Response, next: NextFunction) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  authMiddleware(req, res, next)
});

export default router;