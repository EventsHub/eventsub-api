import { Router } from 'express';
import { listarCategoriasComProdutos, listarCategorias } from '../controllers/categoria.controller';

const router = Router();

router.get('/', listarCategorias as any);
router.get('/produtos', listarCategoriasComProdutos as any);

export default router;
