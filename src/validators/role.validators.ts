import { objectBody, requiredText } from './common';

export function validateRoleName(body: unknown): void {
  requiredText(objectBody(body), 'name');
}
