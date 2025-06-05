import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity'; // Relacionamento com Pedido
import { Servico } from './servico.entity'; // Relacionamento com Servico
import { Produto } from './produto.entity'; // Relacionamento com Produto

@Entity()
export class ItemPedido {
   constructor(init?:Partial<ItemPedido>){
    if (init){
      Object.assign(this,init)
    }
  }
  @PrimaryGeneratedColumn()
  id_item_pedido: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido;

  @ManyToOne(() => Servico, (servico) => servico.itensPedido, { nullable: true })
  servico: Servico;

  @ManyToOne(() => Produto, (produto) => produto.itensPedido, { nullable: true })
  produto: Produto;

  @Column()
  quantidade: number;
}
