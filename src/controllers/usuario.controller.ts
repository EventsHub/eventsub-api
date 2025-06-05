import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/usuario.entity';

const usuarioRepository = AppDataSource.getRepository(Usuario);

export const cadastrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await usuarioRepository.findOneBy({ email });
    if (usuarioExistente) {
      res.status(400).json({ message: 'Email já cadastrado.' });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = usuarioRepository.create({
      nome,
      email,
      senha: senhaHash,
    });

    await usuarioRepository.save(novoUsuario);

    res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error });
  }
};

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    const usuario = await usuarioRepository.findOneBy({ email });

    if (!usuario) {
      res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      return;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      res.status(401).json({ message: 'Usuário ou senha inválidos.' });
      return;
    }

    const accessToken = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1d' });

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({ ...usuarioSemSenha, accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

export const getPerfilUsuario = async (req: Request, res: Response): Promise<void> => {
  const usuario = req.usuario
  try {

    const { senha, ...usuarioSemSenha } = usuario;

    res.json(usuarioSemSenha);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.', error });
  }
};

export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  const usuario = req.usuario
  try {
    const { nome, email, senha } = req.body;

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuarioRepository.save(usuario);

    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
  }
};
