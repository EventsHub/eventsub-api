// src/routes/pedido.routes.ts
import { Router } from 'express';
import { criarPedido, listarPedidosDoUsuario,cancelarPedido} from '../controllers/pedido.controller';
import { autenticarJWT } from '../middleware/auth.middleware';
import { validar } from '../middleware/validacao.middleware';
import { pedidoSchema } from '../validation/pedido.validation';

const router = Router();

router.post('/', autenticarJWT, validar(pedidoSchema), criarPedido);
router.get('/', autenticarJWT, listarPedidosDoUsuario);
router.patch('/cancelar/:id_pedido', autenticarJWT, cancelarPedido);

export default router;
