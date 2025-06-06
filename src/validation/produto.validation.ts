import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z.string({ required_error: "O nome do produto é obrigatório." })
    .min(1, { message: "O nome do produto é obrigatório." }),

  descricao: z.string({ required_error: "A descrição do produto é obrigatória." })
    .min(1, { message: "A descrição do produto é obrigatória." }),

  preco: z.number({ required_error: "O preço do produto é obrigatório." })
    .positive({ message: "O preço deve ser um número positivo." }),

  imagens: z.array(
    z.string().url({ message: "Cada imagem deve ter uma URL válida." })
  , { required_error: "É necessário fornecer pelo menos uma imagem do produto." })
    .min(1, { message: "É necessário fornecer pelo menos uma imagem do produto." }),

  categorias: z.array(
    z.number({ invalid_type_error: "IDs das categorias devem ser números." })
  , { required_error: "O produto deve pertencer a pelo menos uma categoria." })
    .min(1, { message: "O produto deve pertencer a pelo menos uma categoria." }),
});
