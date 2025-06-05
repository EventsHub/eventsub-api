import { Router } from "express";
import usuarioRoutes from "./usuario.route";
import pedidoRoutes from "./pedido.route";
import produtoRoutes from "./produto.route";
import fornecedorRouter from "./fornecedor.route";
import categoriaRoutes from './categoria.route';
import favoritosRoutes from './favorito.routes'

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/pedidos", pedidoRoutes);
router.use('/produtos', produtoRoutes);
router.use("/fornecedores", fornecedorRouter);
router.use('/categorias', categoriaRoutes);
router.use("/favoritos",favoritosRoutes)

export default router;