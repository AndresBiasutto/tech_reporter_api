import { Router } from 'express';
import { createRole, deleteRole, getRole, listRoles, updateRole } from '../controllers/role.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { validateBody, validateUuidParam } from '../middlewares/validation.middleware';
import { validateRoleName } from '../validators/role.validators';

export const roleRouter = Router();

roleRouter.get('/', authenticate, requireAccountType('company'), asyncHandler(listRoles));
roleRouter.get('/:id', authenticate, validateUuidParam('id'), requireAccountType('company'), asyncHandler(getRole));
roleRouter.post('/', authenticate, validateBody(validateRoleName), requireAccountType('company'), asyncHandler(createRole));
roleRouter.patch('/:id', authenticate, validateBody(validateRoleName), validateUuidParam('id'), requireAccountType('company'), asyncHandler(updateRole));
roleRouter.delete('/:id', authenticate, validateUuidParam('id'), requireAccountType('company'), asyncHandler(deleteRole));
