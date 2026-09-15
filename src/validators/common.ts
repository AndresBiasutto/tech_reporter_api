import { ValidationError } from '../utils/errors';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function objectBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ValidationError('Request body must be an object');
  return value as Record<string, unknown>;
}

export function requiredText(body: Record<string, unknown>, field: string): string {
  const value = body[field];
  if (typeof value !== 'string' || !value.trim()) throw new ValidationError(`${field} is required`);
  return value.trim();
}

export function optionalText(body: Record<string, unknown>, field: string): string | undefined {
  if (body[field] === undefined) return undefined;
  return requiredText(body, field);
}

export function requiredEmail(body: Record<string, unknown>, field = 'email'): string {
  const email = requiredText(body, field).toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new ValidationError(`${field} must be a valid email`);
  return email;
}

export function optionalEmail(body: Record<string, unknown>, field = 'email'): string | undefined {
  if (body[field] === undefined) return undefined;
  return requiredEmail(body, field);
}

export function requiredUuid(body: Record<string, unknown>, field: string): string {
  const value = requiredText(body, field);
  if (!UUID_PATTERN.test(value)) throw new ValidationError(`${field} must be a UUID`);
  return value;
}

export function password(body: Record<string, unknown>, field = 'password'): string {
  const value = requiredText(body, field);
  if (value.length < 4) throw new ValidationError(`${field} must contain at least 4 characters`);
  return value;
}
