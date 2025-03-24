import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { BadRequestException, NotFoundException, UnauthorizedException } from './error';
import jwt from 'jsonwebtoken';
import User from '../models/user';


export interface AuthenticatedRequest extends Request {
  user?: User;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new BadRequestException('Authorization token is missing or invalid');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token not found');
    }

    // Decode the JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      if (!decoded.id) {
        throw new BadRequestException('Invalid token issued');
      }

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['hashedPassword'] },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      req.user = user;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired. Please login again.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token. Please login again.');
      }
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
