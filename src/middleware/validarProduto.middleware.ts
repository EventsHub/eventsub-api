import { Request, Response, NextFunction } from 'express';
import { produtoSchema } from '../validation/produto.validation';
import { ZodError } from 'zod';

export const validarProduto = (req: Request, res: Response, next: NextFunction): void => {
  try {
    produtoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ mensagem: 'Dados inválidos', erros: error.errors });
    } else {
      res.status(500).json({ mensagem: 'Erro ao validar os dados.' });
    }
  }
};
