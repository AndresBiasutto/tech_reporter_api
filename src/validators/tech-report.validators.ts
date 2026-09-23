import { ValidationError } from '../utils/errors';
import { objectBody, optionalText, requiredText, requiredUuid } from './common';

function validateDate(input: Record<string, unknown>, field: string, required: boolean): void {
  if (input[field] === undefined && !required) return;
  const value = required ? requiredText(input, field) : optionalText(input, field)!;
  if (Number.isNaN(Date.parse(value))) throw new ValidationError(`${field} must be a valid ISO date`);
}

export function validateCreateTechReport(body: unknown): void {
  const input = objectBody(body);
  requiredUuid(input, 'techIssueId');
  optionalText(input, 'solution');
  validateDate(input, 'dateStart', true);
  validateDate(input, 'dateEnd', false);
}
