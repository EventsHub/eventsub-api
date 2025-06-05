import { z } from 'zod';

export const itemPedidoSchema = z.object({
  id_produto: z.number(),
  quantidade: z.number().min(1),
  horas: z.number().min(1).optional(), // apenas para serviço por hora
});

export const pedidoSchema = z.object({
  itens: z.array(itemPedidoSchema).min(1),
}).and(
  z.object({
    endereco: z.string().min(1).optional(),
  })
);
