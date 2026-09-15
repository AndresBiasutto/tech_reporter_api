import { objectBody, password, requiredEmail, requiredText, requiredUuid } from './common';

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
