import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/usuario.entity';

interface JwtPayload {
  id: number;
  email: string;
}

export const autenticarJWT2 = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const segredo = process.env.JWT_SECRET || 'segredo';
    const payload = jwt.verify(token, segredo) as JwtPayload;

    console.log(segredo);
    console.log(payload.id);

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
