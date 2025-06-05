import { Router } from 'express';
import {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
} from '../controllers/favorito.controller';
import { autenticarJWT } from '../middleware/auth.middleware';

const router = Router();

router.post('/:id_produto', autenticarJWT, adicionarFavorito);
router.delete('/:id_produto', autenticarJWT, removerFavorito);
router.get('/', autenticarJWT, listarFavoritos);

export default router;
