import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Produto } from '../entities/produto.entity';
import { Usuario } from '../entities/usuario.entity';
import { Categoria } from '../entities/categoria.entity';
import { In,Like } from 'typeorm';


export const criarProduto = async (req: Request, res: Response): Promise<void> => {
  const { usuario } = req;
  const { nome, descricao, preco, imagens, categorias } = req.body;

  const usuarioId = usuario.id_usuario;

    if (!categorias || !Array.isArray(categorias) || categorias.length === 0) {
    res.status(400).json({ mensagem: 'Pelo menos uma categoria deve ser informada.' });
    return;
  }

  try {
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id_usuario: usuarioId });

    console.log(usuario);

    if (!usuario) {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      return;
    }

    const categoriaRepo = AppDataSource.getRepository(Categoria);
    const categoriasRelacionadas = await categoriaRepo.find({
      where: { id_categoria: In(categorias) },
    });

    const produtoRepo = AppDataSource.getRepository(Produto);
    const novoProduto = produtoRepo.create({
      nome,
      descricao,
      preco,
      imagens,
      categorias: categoriasRelacionadas,
      usuario, // salva o usuário que cadastrou
    });

    await produtoRepo.save(novoProduto);
    res.status(201).json(novoProduto);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar produto', erro: error.message });
  }
};

export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtoRepo = AppDataSource.getRepository(Produto);
    const produtos = await produtoRepo.find({
      relations: ["usuario", "fornecedor", "categorias"],
    });
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar produtos" });
  }
};

export const listarProdutosPorCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produtoRepo = AppDataSource.getRepository(Produto);
    const produtos = await produtoRepo.find({
      where:{categorias:{id_categoria:parseInt(id)}}
    })

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar por categoria" });
  }
};

export const buscarProdutoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produtoRepo = AppDataSource.getRepository(Produto);
    const produto = await produtoRepo.findOne({
      where: { id_produto: Number(id) },
      relations: ["usuario","fornecedor", "categorias"],
      select: {fornecedor:true,categorias:true,usuario:{nome:true,email:true,}}
    });

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar produto por ID" });
  }
};

export const buscarProdutoPorNome = async (req: Request, res: Response) => {
  const { nome } = req.query;

  if (typeof nome !== "string") {
    return res.status(400).json({ mensagem: "Nome inválido" });
  }

  try {
    const produtoRepo = AppDataSource.getRepository(Produto);
    const produtos = await produtoRepo.find({
      where:{
      nome: Like(`%${nome}%`)
      }
    })
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar produto por nome" });
  }
};
