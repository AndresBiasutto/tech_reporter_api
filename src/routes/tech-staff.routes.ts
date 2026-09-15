import { Router } from 'express';
import { assignTechStaffRole, createTechStaff, deleteTechStaff } from '../controllers/company-account.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { validateBody, validateUuidParam } from '../middlewares/validation.middleware';
import { validateCreateTechStaff, validateRoleAssignment } from '../validators/company-account.validators';

export const techStaffRouter = Router();

techStaffRouter.post('/', authenticate, validateBody(validateCreateTechStaff), requireAccountType('company'), asyncHandler(createTechStaff));
techStaffRouter.patch('/:id/role', authenticate, validateBody(validateRoleAssignment), validateUuidParam('id'), requireAccountType('company'), asyncHandler(assignTechStaffRole));
techStaffRouter.delete('/:id', authenticate, validateUuidParam('id'), requireAccountType('company'), asyncHandler(deleteTechStaff));
