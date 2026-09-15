import { Request, Response } from 'express';
import { toSessionResponse } from '../contracts/user.contract';
import { AuthService } from '../services/auth.service';
import { AUTH_COOKIE_NAME } from '../utils/auth-cookie';

const authService = new AuthService();

function writeSessionCookie(response: Response, userId: string, accountType: string): void {
  response.cookie(AUTH_COOKIE_NAME, JSON.stringify({ userId, accountType }), {
    httpOnly: true,
    signed: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
}

export async function login(request: Request, response: Response): Promise<void> {
  const { email, password } = request.body as { email: string; password: string };
  const account = await authService.login(email.toLowerCase(), password);
  writeSessionCookie(response, account.user.id_user, account.user.account_type);
  response.status(200).json({ user: toSessionResponse(account.user, account.roleId) });
}

export async function getMe(request: Request, response: Response): Promise<void> {
  const account = await authService.getOwnAccount(request.auth!.userId);
  response.status(200).json({ user: toSessionResponse(account.user, account.roleId) });
}

export async function updateMe(request: Request, response: Response): Promise<void> {
  const account = await authService.updateOwnAccount(request.auth!.userId, request.body as Record<string, string>);
  writeSessionCookie(response, account.user.id_user, account.user.account_type);
  response.status(200).json({ user: toSessionResponse(account.user, account.roleId) });
}
