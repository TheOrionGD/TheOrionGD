import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter, requireAuth } from './auth.js';
import { adminRouter } from './admin.js';
import { publicRouter } from './public.js';
import { chatRouter } from './chat.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Mount routers on both /api/... and /... to support local Express and Vercel serverless rewriting
app.use(['/api/auth', '/auth'], authRouter);
app.use(['/api/admin', '/admin'], requireAuth, adminRouter);
app.use(['/api/public', '/public'], publicRouter);
app.use(['/api/chat', '/chat'], chatRouter);

app.get(['/api/health', '/health'], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

export default app;
