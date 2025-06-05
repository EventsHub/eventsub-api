import * as z from "zod";

export const fornecedorSchema = z.object({
  cpf: z.string().min(11, "CPF inválido"),    // Ajuste aqui o tamanho exato se quiser
  cnpj: z.string().min(14, "CNPJ inválido"),
});
