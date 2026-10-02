import { Request, Response, NextFunction } from 'express';

const cache = new Map<string, { expiry: number, data: any }>();

/**
 * Phase 17: Performance Caching
 * Lightweight in-memory cache for high-volume, read-only GET endpoints.
 * Intercepts res.json and res.send to cache responses.
 */
export const cacheMiddleware = (durationInSeconds: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedEntry = cache.get(key);

    if (cachedEntry && cachedEntry.expiry > Date.now()) {
      return res.json(cachedEntry.data);
    }

    // Override res.json to capture response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      // Don't cache errors
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          expiry: Date.now() + durationInSeconds * 1000,
          data: body
        });
      }
      return originalJson(body);
    };

    next();
  };
};
