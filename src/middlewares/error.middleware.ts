import { ErrorRequestHandler } from 'express';
import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors';

const knownErrors = [ValidationError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError];

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const isKnownError = knownErrors.some((ErrorType) => error instanceof ErrorType);
  const status = isKnownError ? error.status : 500;
  const message = isKnownError ? error.message : 'Internal server error';

  response.status(status).json({ error: { message } });
};
