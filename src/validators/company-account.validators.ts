import { ValidationError } from '../utils/errors';
import { objectBody, optionalEmail, optionalText, password, requiredEmail, requiredText, requiredUuid } from './common';

export function validateCreateClient(body: unknown): void {
  const input = objectBody(body);
  requiredText(input, 'name');
  requiredEmail(input);
  requiredText(input, 'phone');
  password(input);
  requiredUuid(input, 'roleId');
}

export function validateCreateTechStaff(body: unknown): void {
  validateCreateClient(body);
  requiredUuid(objectBody(body), 'clientId');
}

export function validateRoleAssignment(body: unknown): void {
  requiredUuid(objectBody(body), 'roleId');
}
export function validateUpdateClient(body: unknown): void {
  const input = objectBody(body);
  const name = optionalText(input, 'name');
  const email = optionalEmail(input);
  const phone = optionalText(input, 'phone');

  if (!name && !email && !phone) {
    throw new ValidationError('At least one editable field is required');
  }
}