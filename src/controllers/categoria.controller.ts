import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Categoria } from '../entities/categoria.entity';

export const  listarCategorias = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Categoria);
    const categorias = await repo.find();
    
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar por categoria" });
  }
};

