import { ZodSchema, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validar = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const mensagens = error.errors.map(e => ({ reason: e.message }));

      return res.status(422).json({ invalid_params: mensagens });
    }
    return res.status(422).json({ message: 'Dados inválidos' });
  }
};
