import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { ValidationError } from "express-validation";

type ErrorDetails = Record<string, unknown> | string | undefined;

export class BaseException extends Error {
  public status: number;
  public details?: ErrorDetails;

  constructor(status: number, message: string, details?: ErrorDetails) {
    super(message);
    this.status = status;
    this.details = details;

    // Ensure proper prototype chain
    Object.setPrototypeOf(this, BaseException.prototype)
  }
}

export class BadRequestException extends BaseException {
  constructor(message: string = 'Bad Request', details?: ErrorDetails) {
    super(400, message, details);
  }
}

export class InternalServerErrorException extends BaseException {
  constructor(message: string = 'Internal Server Error', details?: ErrorDetails) {
    super(500, message, details);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string = 'Not Found', details?: ErrorDetails) {
    super(404, message, details);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Forbidden', details?: ErrorDetails) {
    super(403, message, details);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized', details?: ErrorDetails) {
    super(401, message, details);
  }
}

const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: 'Validation failed',
      details: err.details,
    });
  }
  
  if (err instanceof BaseException) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      details: err.details
    })
  }

  // Handle unexpected errors
  logger.error(err);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}

export default errorHandler;