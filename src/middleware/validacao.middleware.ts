import { RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validar = (schema: ZodSchema<any>): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const mensagens = error.errors.map(e => e.message);
        res.status(400).json({ message: mensagens });
        return;
      }
      res.status(400).json({ message: 'Dados inválidos' });
      return;
    }
  };
};
