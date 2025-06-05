import { RequestHandler } from 'express';
import { atualizarUsuarioSchema } from '../validation/usuario.validation';

export const validarAtualizacaoUsuario: RequestHandler = (req, res, next) => {
  const resultado = atualizarUsuarioSchema.safeParse(req.body);

  if (!resultado.success) {
    const erros = resultado.error.errors.map(err => err.message);
    res.status(400).json({ message: 'Erro de validação', erros });
    return; // <-- ESSENCIAL
  }

  next();
};
