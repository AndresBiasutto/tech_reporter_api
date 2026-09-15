import { Router } from 'express';
import { assignClientRole, createClient, deleteClient } from '../controllers/company-account.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { validateBody, validateUuidParam } from '../middlewares/validation.middleware';
import { validateCreateClient, validateRoleAssignment } from '../validators/company-account.validators';

export const clientRouter = Router();

clientRouter.post('/', authenticate, validateBody(validateCreateClient), requireAccountType('company'), asyncHandler(createClient));
clientRouter.patch('/:id/role', authenticate, validateBody(validateRoleAssignment), validateUuidParam('id'), requireAccountType('company'), asyncHandler(assignClientRole));
clientRouter.delete('/:id', authenticate, validateUuidParam('id'), requireAccountType('company'), asyncHandler(deleteClient));
