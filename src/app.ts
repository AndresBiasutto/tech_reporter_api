import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? true, credentials: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use(errorHandler);
