import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

/** Use for routes whose :id identifies a User profile. */
export function requireOwnUser(request: Request, _response: Response, next: NextFunction): void {
  if (!request.auth) return next(new UnauthorizedError('Authentication is required'));
  if (request.params.id !== request.auth.userId) return next(new ForbiddenError('You can only modify your own account'));
  next();
}
