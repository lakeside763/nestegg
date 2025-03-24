import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";


export default class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: {
          user,
          token
        }
      })
    } catch (err) {
      return next(err);
    }
  }

}