import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.routes';
import { clientRouter } from './routes/client.routes';
import { roleRouter } from './routes/role.routes';
import { techStaffRouter } from './routes/tech-staff.routes';

export const app = express();
const cookieSecret = process.env.COOKIE_SECRET;

if (!cookieSecret) {
  throw new Error('Missing required configuration: COOKIE_SECRET');
}

app.use(cors({ origin: process.env.CORS_ORIGIN ?? true, credentials: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/clients', clientRouter);
app.use('/tech-staff', techStaffRouter);
app.use('/roles', roleRouter);

app.use(errorHandler);
import 'dotenv/config';
