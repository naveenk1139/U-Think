import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is missing.");
  process.exit(1);
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
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
      const decoded = jwt.verify(token, JWT_SECRET!) as { id: string; email: string; name: string };
      
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ error: 'Unauthorized — User no longer exists.' });
        return;
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      };
      
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

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized — No user context.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Forbidden — Requires one of roles: ${roles.join(', ')}` });
    }
    next();
  };
};

/**
 * Optionally extract user from JWT without rejecting if missing
 */
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET!) as { id: string; email: string; name: string };
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    } catch (error) {
      // Ignore errors for optional auth
    }
  }
  return next();
};

export const verifyJwtToken = protect;
export default protect;
