import { NextFunction, Request, Response } from 'express';
import { AccountType } from '../models';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export function requireAccountType(...acceptedTypes: AccountType[]) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.auth) return next(new UnauthorizedError('Authentication is required'));
    if (!acceptedTypes.includes(request.auth.accountType)) {
      return next(new ForbiddenError('This account type cannot access the resource'));
    }
    next();
  };
}
