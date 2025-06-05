import { Router } from 'express';
import {
  cadastrarUsuario,
  loginUsuario,
  getPerfilUsuario,
  atualizarUsuario,
} from '../controllers/usuario.controller';

import { autenticarJWT } from '../middleware/auth.middleware';
import { validar } from '../middleware/validacao.middleware';
import {
  cadastroUsuarioSchema,
  loginUsuarioSchema,
} from '../validation/usuario.validation';
import { validarAtualizacaoUsuario } from '../middleware/validarAtualizacaoUsuario.middleware';

const router = Router();

router.post('/cadastro', validar(cadastroUsuarioSchema), cadastrarUsuario);
router.post('/login', validar(loginUsuarioSchema), loginUsuario);

router.get('/perfil', autenticarJWT, getPerfilUsuario);
router.patch('/perfil', autenticarJWT, validarAtualizacaoUsuario, atualizarUsuario);

export default router;
