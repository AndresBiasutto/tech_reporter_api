import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../utils/errors';

export type BodyValidator = (body: unknown) => void;

export function validateBody(validator: BodyValidator) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    try {
      validator(request.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUuidParam(param: string) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!UUID_PATTERN.test(request.params[param] ?? '')) return next(new ValidationError(`${param} must be a UUID`));
    next();
  };
}
