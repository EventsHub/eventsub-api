import { Router } from 'express';
import { listarCategorias } from '../controllers/categoria.controller';

const router = Router();

router.get('/', listarCategorias as any);

export default router;
