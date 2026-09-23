import { objectBody, optionalText, requiredText } from './common';

export function validateCreateTechIssue(body: unknown): void {
  const input = objectBody(body);
  optionalText(input, 'whereToGo');
  requiredText(input, 'urgencyLevel');
  requiredText(input, 'description');
  requiredText(input, 'status');
}
