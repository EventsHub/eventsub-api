import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Pedido } from '../entities/pedido.entity';
import { Usuario } from '../entities/usuario.entity';
import { ItemPedido } from '../entities/itemPedido.entity';
import { Produto } from '../entities/produto.entity';

const pedidoRepository = AppDataSource.getRepository(Pedido);
const usuarioRepository = AppDataSource.getRepository(Usuario);
const itemPedidoRepository = AppDataSource.getRepository(ItemPedido);
const produtoRepository = AppDataSource.getRepository(Produto);

export const criarPedido = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuario = req.usuario
  try {

    const { itens, endereco } = req.body;

    // Verifica e salva endereço se necessário
    if (!usuario.endereco) {
      if (!endereco) {
        res.status(400).json({ message: 'Endereço obrigatório para finalizar o pedido.' });
        return;
      }
      usuario.endereco = endereco;
      await usuarioRepository.save(usuario);
    }



    let valorTotal = 0;

    const itensDoPedido = await Promise.all(itens.map(async (item: { id_produto: any; quantidade: number; }) => {

      const produto = await produtoRepository.findOneBy({ id_produto: item.id_produto });
      if (!produto) {
        res.status(404).json({ message: `Produto com ID ${item.id_produto} não encontrado.` });
        return;
      }
      const valorItem = Number(produto.preco) * item.quantidade;
      valorTotal += valorItem;
      return new ItemPedido({
        produto,
        quantidade: item.quantidade
      })
    })
    )
    // const itemPedido = itemPedidoRepository.create({
    //   pedido: novoPedido,
    //   produto,
    //   quantidade: item.quantidade,
    // });

  
      // novoPedido.itens.push(itemPedido);

    // novoPedido.valor_total = valorTotal;
    const novoPedido = new Pedido({
    usuario,
    data_pedido: new Date(),
    status: 'pendente',
    valor_total: valorTotal,
    itens: itensDoPedido,
  });
console.log(novoPedido.itens)
  const pedidoCadastrado = await pedidoRepository.save(novoPedido)

  const pedidoNoBanco = await pedidoRepository.findOne({
    where: { id_pedido: pedidoCadastrado.id_pedido },
    relations: ['itens']
  })

  res.status(201).json({
    message: 'Pedido criado com sucesso.',
    pedido: pedidoNoBanco,
  });
} catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Erro ao criar pedido' });
}
};

export const listarPedidosDoUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = (req as any).usuarioId;

    const pedidos = await pedidoRepository.find({
      where: { usuario: { id_usuario: usuarioId } },
      relations: {
        itens: {
          produto: true,
        },
      },
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao listar pedidos do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
};



export const cancelarPedido = async (req: Request, res: Response): Promise<void> => {
  const usuario = req.usuario;
  const { id_pedido } = req.params;
  
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  try {
    // Verifica se o ID é válido
    const id = parseInt(id_pedido, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID do pedido inválido.' });
      return;
    }

    // Busca o pedido
    const pedido = await pedidoRepository.findOne({
      where: { id_pedido: id },
      relations: ['usuario'],
    });

    if (!pedido) {
      res.status(404).json({ message: 'Pedido não encontrado.' });
      return;
    }

    // Verifica se o pedido pertence ao usuário logado
    if (pedido.usuario.id_usuario !== usuario.id_usuario) {
      res.status(403).json({ message: 'Você não tem permissão para cancelar este pedido.' });
      return;
    }

    // Verifica se pode cancelar (ex: não pode cancelar se já foi pago)
    if (pedido.status === 'pago' || pedido.status === 'cancelado') {
      res.status(400).json({ message: `Não é possível cancelar um pedido com status '${pedido.status}'.` });
      return;
    }

    // Atualiza o status para 'cancelado'
    await pedidoRepository.update(pedido.id_pedido, { status: 'cancelado' });

    res.status(200).json({ message: 'Pedido cancelado com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao cancelar pedido.', erro: error.message });
  }
};
