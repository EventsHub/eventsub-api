import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
}

export const autenticarJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const segredo = process.env.JWT_SECRET || 'segredo';
    const payload = jwt.verify(token, segredo) as JwtPayload;

    (req as any).user = {
      id: payload.id,
      email: payload.email,
    };

    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};
