import { Router } from 'express';
import { getCompany } from '../controllers/company.controller';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { validateUuidParam } from '../middlewares/validation.middleware';

export const companyRouter = Router();

companyRouter.get('/:id', authenticate, validateUuidParam('id'), requireAccountType('company'), asyncHandler(getCompany));
