import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().min(1),
  preco: z.number().positive(),
  imagens: z.array(z.string().url()).min(1),
  categorias: z.array(z.number()).min(1),
});
