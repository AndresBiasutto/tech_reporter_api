import { Router } from 'express';
import { createTechReport } from '../controllers/tech-report.controller';
import { getTechReportById } from '../controllers/company-resource.controller';
import { listTechReports } from '../controllers/visibility.controller';
import { requireAccountType } from '../middlewares/account-type.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateUuidParam } from '../middlewares/validation.middleware';
import { validateCreateTechReport } from '../validators/tech-report.validators';

export const techReportRouter = Router();

techReportRouter.get('/', authenticate, requireAccountType('company', 'client', 'tech_staff'), asyncHandler(listTechReports));
techReportRouter.get('/:id', authenticate, validateUuidParam('id'), requireAccountType('company', 'client', 'tech_staff'), asyncHandler(getTechReportById));
techReportRouter.post('/', authenticate, validateBody(validateCreateTechReport), requireAccountType('tech_staff'), asyncHandler(createTechReport));
