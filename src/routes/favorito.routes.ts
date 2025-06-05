import { Router } from 'express';
import {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
} from '../controllers/favorito.controller';
import { autenticarJWT2 } from '../middleware/auth2.middleware';

const router = Router();

router.post('/:id_produto', autenticarJWT2, adicionarFavorito);
router.delete('/:id_produto', autenticarJWT2, removerFavorito);
router.get('/', autenticarJWT2, listarFavoritos);

export default router;
