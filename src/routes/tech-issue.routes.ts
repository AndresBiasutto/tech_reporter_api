import { Router } from 'express';
import { createTechIssue } from '../controllers/tech-issue.controller';
import { getTechIssueById } from '../controllers/company-resource.controller';
import { listTechIssues } from '../controllers/visibility.controller';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateUuidParam } from '../middlewares/validation.middleware';
import { validateCreateTechIssue } from '../validators/tech-issue.validators';

export const techIssueRouter = Router();

techIssueRouter.get('/', authenticate, requireAccountType('company', 'client', 'tech_staff'), asyncHandler(listTechIssues));
techIssueRouter.get('/:id', authenticate, validateUuidParam('id'), requireAccountType('company', 'client', 'tech_staff'), asyncHandler(getTechIssueById));
techIssueRouter.post('/', authenticate, validateBody(validateCreateTechIssue), requireAccountType('client'), asyncHandler(createTechIssue));
