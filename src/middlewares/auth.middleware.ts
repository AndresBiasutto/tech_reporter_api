import { NextFunction, Request, Response } from 'express';
import { accountTypes, AccountType } from '../models';
import { UnauthorizedError } from '../utils/errors';
import { AUTH_COOKIE_NAME } from '../utils/auth-cookie';

interface SignedSession {
  userId: string;
  accountType: AccountType;
}

function isSignedSession(value: unknown): value is SignedSession {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<SignedSession>;
  return typeof candidate.userId === 'string' && accountTypes.includes(candidate.accountType as AccountType);
}

/** Temporary signed-cookie authentication boundary; JWT can replace its input later. */
export function authenticate(request: Request, _response: Response, next: NextFunction): void {
  try {
    const rawSession = request.signedCookies?.[AUTH_COOKIE_NAME];
    if (typeof rawSession !== 'string') throw new UnauthorizedError('Authentication is required');
    const parsed: unknown = JSON.parse(rawSession);
    if (!isSignedSession(parsed)) throw new UnauthorizedError('Invalid authentication session');
    request.auth = parsed;
    next();
  } catch (error) {
    next(error instanceof UnauthorizedError ? error : new UnauthorizedError('Invalid authentication session'));
  }
}
