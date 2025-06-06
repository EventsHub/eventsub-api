import { Router } from "express";
import { tornarFornecedor } from "../controllers/fornecedor.controller";
import { autenticarJWT } from "../middleware/auth.middleware";
import { validar } from "../middleware/validacao.middleware";
import { fornecedorSchema } from "../validation/fornecedor.validation";

const router = Router();

router.post("/tornar-fornecedor", autenticarJWT, validar(fornecedorSchema) as any, tornarFornecedor as any);

export default router;
