import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'uthink_jwt_secret_key_2026_super_secure';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Protect routes by verifying JWT token in Authorization header
 */
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
      
      req.user = decoded;
      return next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized — Token verification failed or expired.' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized — No token provided.' });
    return;
  }
};

export const verifyJwtToken = protect;
export default protect;
