import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/usuario.entity';
import { Produto } from '../entities/produto.entity';
import { Favorito } from '../entities/favorito.entity';

const usuarioRepository = AppDataSource.getRepository(Usuario);
const produtoRepository = AppDataSource.getRepository(Produto);

export const adicionarFavorito = async (req: Request, res: Response): Promise<void> => {
  const usuario = req.usuario
  console.log(usuario)
  try {

    const { id_produto } = req.params;

    if (!id_produto || isNaN(Number(id_produto))) {
      res.status(400).json({ mensagem: 'ID do produto inválido ou ausente.' });
      return;
    }

    const produto = await produtoRepository.findOneBy({ id_produto: Number(id_produto) });

    if (!produto) {
      res.status(404).json({ mensagem: 'Produto não encontrado.' });
      return;
    }

    const existeFavorito = usuario.favoritos.find(favorito => favorito.id_produto === produto.id_produto)

    if (existeFavorito) {
      res.status(400).json({ mensagem: 'Produto já está nos favoritos.' });
      return;
    }

    usuario.favoritos.push(produto);

    await usuarioRepository.save(usuario)

    res.status(200).json({ mensagem: 'Produto adicionado aos favoritos.' });
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro ao adicionar favorito.', erro: error.message });
  }
};


export const removerFavorito = async (req: Request, res: Response): Promise<void> => {
  const usuario = req.usuario

  try {
    const { id_produto } = req.params;

    const favoritoExiste = usuario.favoritos.find(p => p.id_produto === Number(id_produto));

    if (!favoritoExiste) {
      res.status(400).json({ mensagem: 'Produto não está nos favoritos.' });
      return;
    }

    const produtoNaoFavorito = usuario.favoritos.filter(favorito => favorito.id_produto !== favoritoExiste.id_produto);
    usuario.favoritos = produtoNaoFavorito

    await usuarioRepository.save(usuario);

    res.status(200).json({ mensagem: 'Produto removido dos favoritos.' });
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro ao remover favorito.', erro: error.message });
  }
};

export const listarFavoritos = async (req: Request, res: Response) => {
  const usuario = req.usuario

  const favoritos = usuario.favoritos

  res.status(200).json({favoritos})
};
