/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from './db.js';

export const authRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'oriongd-secret-key-change-in-prod';
const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || 'oriongd_admin_token';

// Simple in-memory rate limiter for login attempts: IP -> { count, lastAttempt }
const loginAttempts = new Map();

authRouter.post('/login', async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown-ip';
    const now = Date.now();
    const attemptData = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };

    // Reset after 15 minutes
    if (now - attemptData.lastAttempt > 15 * 60 * 1000) {
      attemptData.count = 0;
    }

    if (attemptData.count >= 5) {
      return res.status(429).json({ error: 'Too many login attempts. Please try again after 15 minutes.' });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const db = await getDb();
    const user = await db.collection('admin_users').findOne({ username: username.trim() });

    if (!user) {
      attemptData.count++;
      attemptData.lastAttempt = now;
      loginAttempts.set(ip, attemptData);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      attemptData.count++;
      attemptData.lastAttempt = now;
      loginAttempts.set(ip, attemptData);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Reset attempts on successful login
    loginAttempts.delete(ip);

    // Update lastLoginAt
    await db.collection('admin_users').updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    );

    // Issue JWT (valid for 2 hours)
    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      path: '/',
    });

    return res.json({ success: true, username: user.username });
  } catch (err) {
    console.error('[Auth API] Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
});

authRouter.post('/logout', (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
  });
  return res.json({ success: true, message: 'Logged out successfully' });
});

authRouter.get('/status', requireAuth, (req, res) => {
  return res.json({ authenticated: true, user: req.user });
});

// Alias used by AdminDashboard to verify session
authRouter.get('/me', requireAuth, (req, res) => {
  return res.json({ authenticated: true, user: req.user });
});

export function requireAuth(req, res, next) {
  try {
    let token = null;
    if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized — No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized — Invalid or expired token' });
  }
}
