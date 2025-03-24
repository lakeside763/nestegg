import { User } from "../models/user"; // Adjust the import path if needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
