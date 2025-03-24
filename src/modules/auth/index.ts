import { Router } from "express";
import { loginValidation } from "./auth.validation";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.route('/auth/login')
  .post(loginValidation, authController.login);

export default router;