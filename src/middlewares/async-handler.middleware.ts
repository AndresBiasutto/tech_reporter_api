import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncController = (request: Request, response: Response, next: NextFunction) => Promise<unknown>;

/** Forwards rejected controller promises to the central error middleware in Express 4. */
export function asyncHandler(controller: AsyncController): RequestHandler {
  return (request, response, next) => {
    void controller(request, response, next).catch(next);
  };
}
