import { ValidationError } from '../utils/errors';
import { validateCreateTechIssue } from '../validators/tech-issue.validators';
import { validateCreateTechReport } from '../validators/tech-report.validators';

const issueId = '1ac5d8ef-92d2-44df-845d-76af31aa5e80';

describe('tech issue and report validators', () => {
  it('accepts complete requests', () => {
    expect(() => validateCreateTechIssue({ urgencyLevel: 'high', description: 'Printer offline', status: 'open' })).not.toThrow();
    expect(() => validateCreateTechReport({ techIssueId: issueId, dateStart: '2026-09-21T12:00:00.000Z' })).not.toThrow();
  });

  it('rejects invalid report issue IDs and dates', () => {
    expect(() => validateCreateTechReport({ techIssueId: 'not-a-uuid', dateStart: 'invalid' })).toThrow(ValidationError);
  });
});
