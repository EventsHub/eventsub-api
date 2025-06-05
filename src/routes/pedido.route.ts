// src/routes/pedido.routes.ts
import { Router } from 'express';
import { criarPedido, listarPedidosDoUsuario,cancelarPedido} from '../controllers/pedido.controller';
import { autenticarJWT2 } from '../middleware/auth2.middleware';
import { validar } from '../middleware/validacao.middleware';
import { pedidoSchema } from '../validation/pedido.validation';

const router = Router();

router.post('/', autenticarJWT2, validar(pedidoSchema), criarPedido);
router.get('/', autenticarJWT2, listarPedidosDoUsuario);
router.patch('/cancelar/:id_pedido', autenticarJWT2, cancelarPedido);

export default router;
