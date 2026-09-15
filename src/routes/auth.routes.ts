import { Router } from 'express';
import { getMe, login, updateMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateLogin, validateOwnAccountUpdate } from '../validators/auth.validators';

export const authRouter = Router();

authRouter.post('/login', validateBody(validateLogin), asyncHandler(login));
authRouter.get('/me', authenticate, asyncHandler(getMe));
authRouter.patch('/me', authenticate, validateBody(validateOwnAccountUpdate), asyncHandler(updateMe));
