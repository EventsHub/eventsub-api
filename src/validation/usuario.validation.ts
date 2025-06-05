import { z } from 'zod';

export const cadastroUsuarioSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const loginUsuarioSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().nonempty('Senha é obrigatória'),
});

export const atualizarUsuarioSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.').optional(),
  email: z.string().email('E-mail inválido.').optional(),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').optional(),
});
