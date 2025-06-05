// src/types/express/index.d.ts
import { Request } from 'express';
import { Usuario } from '../../entities/usuario.entity';

declare global {
  namespace Express {
    interface Request {
      usuario: Usuario;
      usuarioId?: number;
    }
  }
}
