import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Usuario } from '../entities/usuario.entity';
import { AppDataSource } from '../config/data-source';

interface JwtPayload {
  id: number;
  email: string;
}

export const autenticarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const segredo = process.env.JWT_SECRET || 'segredo';
    const payload = jwt.verify(token, segredo) as JwtPayload;

    const userRepository = AppDataSource.getRepository(Usuario);
    const usuario = await userRepository.findOne({
      where: {id_usuario: payload.id as number },
      relations:['produto']
  })

    if(!usuario) {
      throw new Error("Usuario não existe")
    }

    req.usuario = usuario;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};
