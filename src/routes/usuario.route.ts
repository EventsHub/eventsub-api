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

router.post('/login', validar(loginUsuarioSchema) as any, loginUsuario);
router.post('/cadastro', validar(cadastroUsuarioSchema) as any, cadastrarUsuario);

router.post('/perfil', autenticarJWT, getPerfilUsuario);
router.patch('/perfil', autenticarJWT, validarAtualizacaoUsuario, atualizarUsuario);

export default router;
