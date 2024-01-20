import { Request, Response, NextFunction } from 'express';
import verifyToken from './VerifyToken.js';

async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.header('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decodedToken = await verifyToken(accessToken);

  if (!decodedToken || decodedToken.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied. User is not an admin.' });
  }

  next();
}

export { authenticateAdmin };
