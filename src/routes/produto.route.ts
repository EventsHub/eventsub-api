import { Router } from 'express';
import {
  criarProduto,
  listarProdutos,
  listarProdutosPorCategoria,
  buscarProdutoPorId,
   buscarProdutoPorNome
} from '../controllers/produto.controller';
import { autenticarJWT } from '../middleware/auth.middleware';
import { validarProduto } from '../middleware/validarProduto.middleware';

const router = Router();

router.post('/', autenticarJWT, validarProduto, criarProduto);
router.get('/', listarProdutos as any );
router.get('/categoria/:id', listarProdutosPorCategoria as any);
router.get('/buscar', buscarProdutoPorNome as any);
router.get('/:id', buscarProdutoPorId as any);

export default router;
