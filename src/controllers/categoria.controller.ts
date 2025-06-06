import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Categoria } from '../entities/categoria.entity';

export const listarCategoriasComProdutos = async (req: Request, res: Response) => {
  try {
    const categoriaRepo = AppDataSource.getRepository(Categoria);

    const categorias = await categoriaRepo
      .createQueryBuilder('categoria')
      .leftJoinAndSelect('categoria.produtos', 'produto')
      .orderBy('categoria.id_categoria', 'ASC')
      .addOrderBy('produto.id_produto', 'DESC')
      .getMany();

    // Limita produtos e remove categorias sem produtos
    const categoriasComProdutosLimitados = categorias
      .map((categoria) => ({
        ...categoria,
        produtos: categoria.produtos.slice(0, 10),
      }))
      .filter((categoria) => categoria.produtos.length > 0); // <- Remove categorias sem produtos

    return res.status(200).json({ categorias: categoriasComProdutosLimitados });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar por categoria' });
  }
};

export const listarCategorias = async (req: Request, res: Response) => {
  try {
    const categoriaRepo = AppDataSource.getRepository(Categoria);
    const categorias = await categoriaRepo.find({ order: { nome_categoria: "ASC", }, });

    return res.status(200).json({ categorias });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar categorias" });
  }
};
