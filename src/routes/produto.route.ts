import { Router } from 'express';
import {
  criarProduto,
  listarProdutos,
  listarProdutosPorCategoria,
  buscarProdutoPorId,
   buscarProdutoPorNome
} from '../controllers/produto.controller';
import { autenticarJWT } from '../middleware/auth.middleware';

import { validar } from '../middleware/validacao.middleware';
import { produtoSchema } from '../validation/produto.validation';

const router = Router();

router.post('/cadastro', autenticarJWT, validar(produtoSchema) as any, criarProduto);
router.get('/', listarProdutos as any );
router.get('/categoria/:id', listarProdutosPorCategoria as any);
router.get('/buscar', buscarProdutoPorNome as any);
router.get('/:id', buscarProdutoPorId as any);

export default router;
