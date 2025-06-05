import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { ItemPedido } from './itemPedido.entity';
import { Pagamento } from './pagamento.entity';

@Entity()
export class Pedido {
  constructor(init?:Partial<Pedido>){
    if (init){
      Object.assign(this,init)
    }
      
  }
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @Column({ type: 'timestamp' })
  data_pedido: Date;

  @Column({ type: 'enum', enum: ['pendente', 'confirmado', 'pago', 'cancelado'], default: 'pendente' })
  status: 'pendente' | 'confirmado' | 'pago' | 'cancelado';

  @Column('decimal')
  valor_total: number;

  @OneToMany(() => ItemPedido, (item) => item.pedido, {eager:true, cascade: true})
  itens: ItemPedido[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.pedido)
  pagamento: Pagamento[];

}
