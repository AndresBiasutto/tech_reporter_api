import { ConflictError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from '../utils/errors';

describe('typed application errors', () => {
  it.each([
    [ValidationError, 400],
    [UnauthorizedError, 401],
    [ForbiddenError, 403],
    [NotFoundError, 404],
    [ConflictError, 409]
  ])('%p has status %i', (ErrorType, status) => {
    expect(new ErrorType('message').status).toBe(status);
  });
});
