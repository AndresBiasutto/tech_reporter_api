import { ValidationError } from '../utils/errors';
import { objectBody, optionalEmail, optionalText, password, requiredEmail } from './common';

export function validateLogin(body: unknown): void {
  const input = objectBody(body);
  requiredEmail(input);
  password(input);
}

export function validateOwnAccountUpdate(body: unknown): void {
  const input = objectBody(body);
  const name = optionalText(input, 'name');
  const email = optionalEmail(input);
  const phone = optionalText(input, 'phone');
  const newPassword = input.password === undefined ? undefined : password(input);
  if (!name && !email && !phone && !newPassword) throw new ValidationError('At least one editable field is required');
}
