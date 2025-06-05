import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Fornecedor } from "../entities/fornecedor.entity";
import { Usuario } from "../entities/usuario.entity";
import { Equal } from "typeorm";

export const tornarFornecedor = async (req: Request, res: Response) => {
  const usuarioId = req.usuarioId;
  const { cpf, cnpj } = req.body;

  // Validação básica dos campos
  if (!cpf || !cnpj) {
    return res.status(400).json({ message: "CPF e CNPJ são obrigatórios." });
  }

  try {
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const fornecedorRepo = AppDataSource.getRepository(Fornecedor);

    // Busca o usuário com a relação de fornecedor (se existir)
    const usuario = await usuarioRepo.findOne({
      where: { id_usuario: usuarioId },
      relations: ['fornecedor'] // Carrega o fornecedor vinculado
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verifica se já é fornecedor (por relação OU tipo)
    if (usuario.fornecedor || usuario.tipo === 'fornecedor') {
      return res.status(400).json({ 
        message: "Usuário já possui cadastro como fornecedor.",
        data: {
          fornecedorId: usuario.fornecedor?.id_fornecedor
        }
      });
    }

    // Verifica se CPF/CNPJ já existem (usando query otimizada)
    const [cpfExistente, cnpjExistente] = await Promise.all([
      fornecedorRepo.findOneBy({ cpf }),
      fornecedorRepo.findOneBy({ cnpj })
    ]);

    if (cpfExistente) {
      return res.status(400).json({ 
        message: "CPF já cadastrado para outro fornecedor.",
        conflictId: cpfExistente.id_fornecedor
      });
    }

    if (cnpjExistente) {
      return res.status(400).json({ 
        message: "CNPJ já cadastrado para outro fornecedor.",
        conflictId: cnpjExistente.id_fornecedor
      });
    }

    // Cria e salva o novo fornecedor em uma transação
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const novoFornecedor = fornecedorRepo.create({
        cpf,
        cnpj,
        usuario
      });

      await transactionalEntityManager.save(novoFornecedor);

      usuario.tipo = "fornecedor";
      await transactionalEntityManager.save(usuario);
    });

    return res.status(201).json({ 
      success: true,
      message: "Usuário atualizado para fornecedor com sucesso.",
      metadata: {
        cpf,
        cnpj,
        usuarioId
      }
    });

  } catch (error: any) {
    console.error("Erro em tornarFornecedor:", error);

    // Tratamento específico para violação de constraint
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Conflito de dados. Verifique se CPF/CNPJ já estão em uso.",
        details: error.detail
      });
    }

    // Erros de validação do TypeORM
    if (error.name === "QueryFailedError") {
      return res.status(400).json({
        message: "Erro na validação dos dados.",
        details: error.message
      });
    }

    return res.status(500).json({ 
      message: "Erro interno no servidor.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};